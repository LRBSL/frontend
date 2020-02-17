import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockchainService } from 'src/app/shared/services/blockchain.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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

interface HistRecord {
  txId: string,
  timestamp: number,
  record: {
    id: string,
    parent_land: string,
    extent: number,
    rlregistry: string,
    current_owner: string,
  }
}

interface BuyerInformation {
  no: string,
  name: string,
  gender: string,
  postalAddress: string,
  registeredDate: string
}

@Component({
  selector: 'app-land-registration',
  templateUrl: './land-registration.component.html',
  styleUrls: ['./land-registration.component.css']
})
export class LandRegistrationComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService, 
    private blockchainService: BlockchainService,
    @Inject(DOCUMENT) private document: Document) { }

  currentStep = 0;
  loading: boolean = false;

  landId: string = null;
  landInformation: LandInformation = null;
  ownerInformation: OwnerInformation = null;
  deedInformation: DeedInformation = null;
  planInformation: PlanInformation = null;

  histRecords: HistRecord[] = [];

  buyerInformation: BuyerInformation = null;

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

  buyerVerifyForm = new FormGroup({
    nic: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subS1.unsubscribe();
    this.subS2.unsubscribe();
    this.subS3.unsubscribe();
    this.subS4.unsubscribe();
  }

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

  p1 = (nic: string, key: string) => {
    return new Promise((resolve, reject) => {
      this.subS1 = this.blockchainService.ownerVerification(nic, key).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }

  async submitLandInformation() {
    this.loading = true;
    this.histRecords = [];
    this.p2(this.landInformation.id).then((res: any) => {
      if (res.success) {
        res.data.forEach(record => {
          let rec: HistRecord = {
            txId: record.txId,
            timestamp: record.timestamp.low,
            record: {
              id: record.value._id,
              parent_land: record.value._parent_land_id,
              extent: record.value._extent,
              rlregistry: record.value._rlregistry,
              current_owner: record.value._current_owner_nic,
            }
          }
          this.histRecords.unshift(rec);
        });
      }
    }).catch((err) => console.log(err))
      .finally(() => {
        this.loading = false;
        this.currentStep++;
      });
  }

  p2 = (id: string) => {
    return new Promise((resolve, reject) => {
      this.subS1 = this.blockchainService.getHistoryForLand(id).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }

  submitLandHistory() {
    this.currentStep++;
  }

  submitBuyerVerification() {
    this.loading = true;
    if (this.buyerVerifyForm.valid) {
      this.p3(this.buyerVerifyForm.controls.nic.value).then((res: any) => {
        if (res.success) {
          let buyer = res.data;
          this.buyerInformation = {
            no: buyer.no,
            name: buyer.name,
            gender: buyer.gender,
            postalAddress: buyer.postalAddress,
            registeredDate: buyer.registeredDate
          }
        }
        this.loading = false;
        this.currentStep++;
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  p3 = (nic: string) => {
    return new Promise((resolve, reject) => {
      this.subS1 = this.blockchainService.buyerVerification(nic).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }

  submitBuyerInformation() {
    this.currentStep++;
  }

  submitCommitTransaction() {
    this.p4(this.buyerInformation.no, this.landInformation.id).then((res:any) => {
      this.alert_type = "success";
      this.alert_content = "Notary vote committed successfully";
      this.document.getElementById("openAlertBoxButton").click();
    }).catch((err:any) => {
      this.alert_type = "error";
      this.alert_content = "Notary vote not committed";
      this.document.getElementById("openAlertBoxButton").click();
    })
  }

  p4 = (newNicNo: string, id: string) => {
    return new Promise((resolve, reject) => {
      this.subS4 = this.blockchainService.changeNotaryVote(newNicNo, id).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    })
  }


  resetOwnerVerify() {
    this.ownerVerifyForm.reset();
  }

  submitBuyerVerify() {

  }

  resetBuyerVerify() {
    this.buyerVerifyForm.reset();
  }

  stopTransaction() {
    this.ownerVerifyForm.reset();
    this.buyerVerifyForm.reset();
    this.currentStep = 0;
    this.loading = false;
  }

  showHideCards(num: number) {
    if (num == this.currentStep) return "collapse show";
    else return "collapse";
  }

  isShowCard(num: number) {
    return num <= this.currentStep;
  }

  isShowSpinner(num: number) {
    return num == this.currentStep && this.loading;
  }

}
