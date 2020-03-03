import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockchainService } from 'src/app/shared/services/blockchain.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { TreeData } from 'src/app/shared/components/tree-box/tree-box.component';
import { landList, ownerList, deedList, planList, buyerList, onGoTrList } from 'src/app/shared/utils/data';

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
  sex?: string,
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

  hist_data: TreeData = null;

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
    // this.subS1.unsubscribe();
    // this.subS2.unsubscribe();
    // this.subS3.unsubscribe();
    // this.subS4.unsubscribe();
  }

  // first card submit method
  // async submitOwnerVerify() {
  //   if (this.ownerVerifyForm.valid) {
  //     this.loading = true;
  //     await this.p1(this.ownerVerifyForm.controls.nic.value, this.ownerVerifyForm.controls.key.value).then((res: any) => {
  //       let landInfo = res.data;
  //       this.landInformation = {
  //         id: landInfo.land.id,
  //         rlregistry: landInfo.land.rlregistry,
  //         current_owner_nic: landInfo.land.current_owner_nic,
  //         extent: landInfo.land.extent,
  //         boundaries: landInfo.land.boundaries,
  //         notary_vote: landInfo.land.notary_vote
  //       };
  //       this.ownerInformation = {
  //         nic_no: landInfo.owner.no,
  //         name: landInfo.owner.name,
  //         address: landInfo.owner.postalAddress,
  //         sex: landInfo.owner.gender,
  //         regDate: landInfo.owner.registeredDate
  //       };
  //       this.deedInformation = {
  //         id: landInfo.deed.id,
  //         type: landInfo.deed.type,
  //         registeredNotary: landInfo.deed.registeredNotary,
  //         registeredAt: landInfo.deed.registeredAt
  //       }
  //       this.planInformation = {
  //         id: landInfo.deed.id,
  //         registeredSurveyor: landInfo.deed.registeredSurveyor,
  //         registeredAt: landInfo.deed.registeredAt
  //       }
  //       this.loading = false;
  //       this.currentStep++;
  //     }).catch((err) => console.log(err));
  //   }
  // }

  async submitOwnerVerify() {
    if (this.ownerVerifyForm.valid) {
      this.loading = true;
      if (this.ownerVerifyForm.controls.nic.value == "123456789V"
        && this.ownerVerifyForm.controls.key.value == "1234") {
        this.landInformation = {
          id: landList[0].id,
          rlregistry: landList[0].rlregistry,
          current_owner_nic: landList[0].current_owner_nic,
          extent: landList[0].extent,
          boundaries: landList[0].boundaries,
          notary_vote: landList[0].notary_vote
        };
        this.ownerInformation = {
          nic_no: ownerList[0].nic_no,
          name: ownerList[0].name,
          address: ownerList[0].address,
          sex: ownerList[0].sex,
          regDate: ownerList[0].regDate
        };
        this.deedInformation = {
          id: deedList[0].id,
          type: deedList[0].type,
          registeredNotary: deedList[0].registeredNotary,
          registeredAt: deedList[0].registeredAt
        }
        this.planInformation = {
          id: planList[0].id,
          registeredSurveyor: planList[0].registeredSurveyor,
          registeredAt: planList[0].registeredAt
        }
        this.loading = false;
        this.currentStep++;
      } else {
        this.alert_type = "error";
        this.alert_content = "Owner verification failed";
        this.document.getElementById("openAlertBoxButton").click();
      }
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
  // async submitLandInformation() {
  //   this.loading = true;
  //   this.p2(this.landInformation.id).then((res: any) => {
  //     if (res.success) {
  //       console.log(res.data);
  //     }
  //   }).catch((err) => console.log(err))
  //     .finally(() => {
  //       this.loading = false;
  //       this.currentStep++;
  //     });
  // }

  async submitLandInformation() {
    this.loading = true;
    this.hist_data = {
      name: "tx1hb131hb1b31b-fds1-h1bjh1",
      timestamp: 152425222,
      data: {
        extent: 10000,
        notary_id: ["NOTARY_001"],
        surveyor_id: "SUR_001",
        owner_nic: "123456789V",
        owner: "Thissa jayaweera"
      },
      children: [
        {
          name: "fsf2qeqe42-fds1-eqesfd",
          timestamp: 152421123,
          data: {
            extent: 10000,
            notary_id: ["NOTARY_001"],
            surveyor_id: "SUR_001",
            owner_nic: "123456785V",
            owner: "Kasun Kanchana"
          },
          children: [
            {
              name: "sfas231ada-fsdffs-sdfsdfq1",
              timestamp: 152411221,
              data: {
                extent: 10000,
                notary_id: ["NOTARY_001"],
                surveyor_id: "SUR_001",
                owner_nic: "123456783V",
                owner: "Kavinda Perera"
              },
              children: []
            }
          ]
        }
      ]
    }
    this.loading = false;
    this.currentStep++;
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

  submitBuyerVerification() {
    this.loading = true;
    if (this.buyerVerifyForm.valid) {
      if(this.buyerVerifyForm.controls.nic.value == "234567890V") {
        this.buyerInformation = {
          no: buyerList[0].no,
          name: buyerList[0].name,
          gender: buyerList[0].gender,
          postalAddress: buyerList[0].postalAddress,
          registeredDate: buyerList[0].registeredDate
        }
        this.loading = false;
        this.currentStep++;
      } else {
        this.alert_type = "error";
        this.alert_content = "Buyer verification failed";
        this.document.getElementById("openAlertBoxButton").click();
      }
    }
  }

  p3 = (nic: string) => {
    return new Promise((resolve, reject) => {
      this.subS3 = this.blockchainService.buyerVerification(nic).subscribe((res: any) => {
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
    onGoTrList[0].status = true;
    if(onGoTrList[0].status) {
      this.alert_type = "success";
      this.alert_content = "Notary vote committed successfully";
      this.document.getElementById("openAlertBoxButton").click();
    } else {
      this.alert_type = "error";
      this.alert_content = "Notary vote not committed";
      this.document.getElementById("openAlertBoxButton").click();
    }
    // this.p4(this.buyerInformation.no, this.landInformation.id).then((res: any) => {
    //   this.alert_type = "success";
    //   this.alert_content = "Notary vote committed successfully";
    //   this.document.getElementById("openAlertBoxButton").click();
    // }).catch((err: any) => {
    //   this.alert_type = "error";
    //   this.alert_content = "Notary vote not committed";
    //   this.document.getElementById("openAlertBoxButton").click();
    // })
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

  resetBuyerVerify() {
    this.buyerVerifyForm.reset();
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
    else return "collapse disabledbutton";
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
