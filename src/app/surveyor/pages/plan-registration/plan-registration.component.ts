import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { BlockchainService, BoundaryObject } from 'src/app/shared/services/blockchain.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

interface LandInformation {
  id?: string,
  rlregistry?: string,
  current_owner_nic?: string,
  extent?: string,
  boundaries?: number[][],
  notary_vote?: string
}

interface OwnerInformation {
  nic_no?: string,
  name?: string,
  address?: string,
  sex?: number[][],
  regDate?: string
}

interface DeedInformation {
  id?: string,
  type?: string,
  registeredNotary?: string,
  registeredAt?: string
}

interface PlanInformation {
  id?: string,
  registeredSurveyor?: string,
  registeredAt?: string
}

interface BuyerInformation {
  no: string,
  name: string,
  gender: string,
  postalAddress: string,
  registeredDate: string
}

@Component({
  selector: 'app-plan-registration',
  templateUrl: './plan-registration.component.html',
  styleUrls: ['./plan-registration.component.css']
})
export class PlanRegistrationComponent implements OnInit, OnDestroy {

  constructor(
    private blockchainService: BlockchainService,
    @Inject(DOCUMENT) private document: Document) { }

  currentStep = 0;
  loading: boolean = false;

  landInformation: LandInformation = null;
  ownerInformation: OwnerInformation = null;
  deedInformation: DeedInformation = null;
  planInformation: PlanInformation = null;

  land1Boundaries: BoundaryObject = null;
  land2Boundaries: BoundaryObject = null;

  subS1: Subscription;
  subS2: Subscription;
  subS3: Subscription;
  subS4: Subscription;

  alert_type: string;
  alert_content: string;

  ownerVerifyForm = new FormGroup({
    nic: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required])
  });

  landForkingForm = new FormGroup({
    left_top_x1: new FormControl('', [Validators.required]),
    left_top_y1: new FormControl('', [Validators.required]),
    right_top_x1: new FormControl('', [Validators.required]),
    right_top_y1: new FormControl('', [Validators.required]),
    left_bottom_x1: new FormControl('', [Validators.required]),
    left_bottom_y1: new FormControl('', [Validators.required]),
    right_bottom_x1: new FormControl('', [Validators.required]),
    right_bottom_y1: new FormControl('', [Validators.required]),
    left_top_x2: new FormControl('', [Validators.required]),
    left_top_y2: new FormControl('', [Validators.required]),
    right_top_x2: new FormControl('', [Validators.required]),
    right_top_y2: new FormControl('', [Validators.required]),
    left_bottom_x2: new FormControl('', [Validators.required]),
    left_bottom_y2: new FormControl('', [Validators.required]),
    right_bottom_x2: new FormControl('', [Validators.required]),
    right_bottom_y2: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subS1.unsubscribe();
    this.subS2.unsubscribe();
    this.subS3.unsubscribe();
    this.subS4.unsubscribe();
  }

  // first card submit method
  async submitOwnerVerify() {
    if (this.ownerVerifyForm.valid) {
      this.loading = true;
      await this.p1(this.ownerVerifyForm.controls.nic.value, this.ownerVerifyForm.controls.key.value).then((res: any) => {
        let landInfo = res.data;
        this.landInformation = {
          id: landInfo.land.id,
          rlregistry: landInfo.land.rlregistry,
          current_owner_nic: landInfo.land.current_owner_nic,
          extent: landInfo.land.extent,
          boundaries: landInfo.land.boundaries,
          notary_vote: landInfo.land.notary_vote
        };
        this.ownerInformation = {
          nic_no: landInfo.owner.no,
          name: landInfo.owner.name,
          address: landInfo.owner.postalAddress,
          sex: landInfo.owner.gender,
          regDate: landInfo.owner.registeredDate
        };
        this.deedInformation = {
          id: landInfo.deed.id,
          type: landInfo.deed.type,
          registeredNotary: landInfo.deed.registeredNotary,
          registeredAt: landInfo.deed.registeredAt
        }
        this.planInformation = {
          id: landInfo.deed.id,
          registeredSurveyor: landInfo.deed.registeredSurveyor,
          registeredAt: landInfo.deed.registeredAt
        }
        this.loading = false;
        this.currentStep++;
      }).catch((err) => console.log(err));
    }
  }

  // promise for first card
  p1 = (nic: string, key: string) => {
    return new Promise((resolve, reject) => {
      this.subS1 = this.blockchainService.ownerVerification(nic, key).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }

  // second card submit method
  async submitLandInformation() {
    this.loading = true;
    this.p2(this.landInformation.id).then((res: any) => {
      if (res.success) {
        console.log(res.data);
      }
    }).catch((err) => console.log(err))
      .finally(() => {
        this.loading = false;
        this.currentStep++;
      });
  }

  // promise for second card
  p2 = (id: string) => {
    return new Promise((resolve, reject) => {
      this.subS2 = this.blockchainService.getHistoryForLand(id).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }

  // third card submit method
  submitLandHistory() {
    this.currentStep++;
  }

  // forth card submit method
  submitLandForking() {
    if (this.landForkingForm.valid) {
      this.land1Boundaries = {
        ltx: this.landForkingForm.controls.left_top_x1.value,
        lty: this.landForkingForm.controls.left_top_y1.value,
        rtx: this.landForkingForm.controls.right_top_x1.value,
        rty: this.landForkingForm.controls.right_top_y1.value,
        rbx: this.landForkingForm.controls.right_bottom_x1.value,
        rby: this.landForkingForm.controls.right_bottom_y1.value,
        lbx: this.landForkingForm.controls.left_bottom_x1.value,
        lby: this.landForkingForm.controls.left_bottom_y1.value
      }
      this.land2Boundaries = {
        ltx: this.landForkingForm.controls.left_top_x2.value,
        lty: this.landForkingForm.controls.left_top_y2.value,
        rtx: this.landForkingForm.controls.right_top_x2.value,
        rty: this.landForkingForm.controls.right_top_y2.value,
        rbx: this.landForkingForm.controls.right_bottom_x2.value,
        rby: this.landForkingForm.controls.right_bottom_y2.value,
        lbx: this.landForkingForm.controls.left_bottom_x2.value,
        lby: this.landForkingForm.controls.left_bottom_y2.value
      }
      this.currentStep++;
    } else {
      this.alert_type = "error";
      this.alert_content = "All the boundary points coordinates are required.";
      this.document.getElementById("openAlertBoxButton").click();
    }
  }

  // fifth card submit method
  async submitCommitTransaction() {
    this.loading = true;
    this.p3(this.landInformation.id).then((res: any) => {
      if (res.output.success) {
        this.alert_type = "success";
        this.alert_content = "Transaction successfully committed.";
        this.document.getElementById("openAlertBoxButton").click();
      } else {
        this.alert_type = "error";
        this.alert_content = "Transaction not committed. " + res.output.error;
        this.document.getElementById("openAlertBoxButton").click();
      }
    }).catch((err) => {
      this.alert_type = "error";
      this.alert_content = "Transaction not committed. " + + err.message;
      this.document.getElementById("openAlertBoxButton").click();
    });
  }

  // promise for fifth card
  p3 = (id: string) => {
    return new Promise((resolve, reject) => {
      this.subS3 = this.blockchainService.landForking(id, this.land1Boundaries, this.land2Boundaries).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }

  // transaction cancel menthod
  cancelTransaction() {
    this.ownerVerifyForm.reset();
    this.buyerVerifyForm.reset();
    this.currentStep = 0;
    this.loading = false;
  }

  // check collapse
  showHideCards(num: number) {
    if (num == this.currentStep) return "collapse show";
    else {
      if (num == 3 || num == 4) return "collapse";
      else return "collapse disabledbutton";
    }
  }

  // check card state
  isShowCard(num: number) {
    return num <= this.currentStep;
  }

  // check spinner state
  isShowSpinner(num: number) {
    return num == this.currentStep && this.loading;
  }
}
