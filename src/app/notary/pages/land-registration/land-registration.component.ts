import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockchainService } from 'src/app/shared/services/blockchain.service';
import { AuthService } from 'src/app/shared/services/auth.service';

interface LandInformation {
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

@Component({
  selector: 'app-land-registration',
  templateUrl: './land-registration.component.html',
  styleUrls: ['./land-registration.component.css']
})
export class LandRegistrationComponent implements OnInit {

  constructor(private authService: AuthService, private blockchainService: BlockchainService) { }

  currentStep = 0;
  loading: boolean = false;

  landId: string = null;
  landInformation: LandInformation = null;
  ownerInformation: OwnerInformation = null;

  ownerVerifyForm = new FormGroup({
    nic: new FormControl('', [Validators.required]),
    key: new FormControl('', [Validators.required])
  });

  buyerVerifyForm = new FormGroup({
    nic: new FormControl('', [Validators.required])
  });

  ngOnInit() {
  }

  submitOwnerVerify() {
    if (this.ownerVerifyForm.valid) {
      this.loading = true;
      this.getForm1().then((res: any) => {
        this.landId = res;
        this.getForm21(res).then(async (res2: any) => {
          this.landInformation = {
            rlregistry: res2.data._rlregistry,
            current_owner_nic: res2.data._current_owner_nic,
            extent: res2.data._extent,
            boundaries: res2.data._boundaries,
            notary_vote: res2.data._notary_vote
          };

          this.getForm22(res2.data._current_owner_nic).then(async (res3: any) => {
            console.log(res3)
            this.ownerInformation = {
              nic_no: res3.data.nic_no,
              name: res3.data.name,
              address: res3.data.address,
              sex: res3.data.sex,
              regDate: res3.data.regDate
            };

            console.log(res2.data._id)

            this.getForm23(res2.data._id).then(async (res4: any) => {
              console.log(res4)
              // this.ownerInformation = {
              //   nic_no: res3.data.nic_no,
              //   name: res3.data.name,
              //   address: res3.data.address,
              //   sex: res3.data.sex,
              //   regDate: res3.data.regDate
              // }

              this.loading = false;
              this.currentStep++;
            }).catch((err) => console.log(err));
          }).catch((err) => console.log(err));
        }).catch((err) => console.log(err));
      }).catch((err) => console.log(err));
    }
  }

  getForm1() {
    let promise = new Promise((resolve, reject) => {
      this.blockchainService.getLandIdByKeyAndNic(
        this.ownerVerifyForm.controls.nic.value,
        this.ownerVerifyForm.controls.key.value).subscribe(async (res: any) => {
          resolve(res.data);
        }, (err) => {
          this.loading = false;
          reject(err);
        });
    })
    return promise;
  }

  getForm21(landId: string) {
    let promise = new Promise((resolve, reject) => {
      this.blockchainService.getLandByID(landId).subscribe((res) => {
        resolve(res);
      }, (err) => reject(err));
    });
    return promise;
  }

  getForm22(nic: string) {
    let promise = new Promise((resolve, reject) => {
      this.authService.getUserByNic(nic).subscribe((res) => {
        console.log(res)
        resolve(res);
      }, (err) => reject(err));
    });
    return promise;
  }

  getForm23(landId: string) {
    let promise = new Promise((resolve, reject) => {
      this.blockchainService.getDeedByLandId(landId).subscribe((res) => {
        console.log(res)
        resolve(res);
      }, (err) => reject(err));
    });
    return promise;
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
