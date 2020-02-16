import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/shared/services/blockchain.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-plan-registration',
  templateUrl: './plan-registration.component.html',
  styleUrls: ['./plan-registration.component.css']
})
export class PlanRegistrationComponent implements OnInit {

  constructor(private blockchainService: BlockchainService) { }

  currentStep = 0;
  loading: boolean = false;

  landId: string = null;
  landInformation: any = null;

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
        this.getForm2(res).then(async (res2:any) => {
          this.landInformation = await res2.data;
          this.loading = false;
          this.currentStep++;
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

  getForm2(landId) {
    let promise = new Promise((resolve, reject) => {
      this.blockchainService.getLandByID(landId).subscribe((res) => {
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
