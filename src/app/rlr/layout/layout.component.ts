import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  host: {
    id: 'page-top'
  }
})
export class LayoutComponent implements OnInit, OnDestroy {

  subS1: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService,
    private authService: AuthService) { }

  ngOnInit() {
    this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-rlr.min.css");
    this.authService.checkCurrentUserExist('r');
    this.p1(this.authService.currentUser.id).then((res: any) => {
      if(res.success) { 
        let user = res.data;
        this.authService.currentUser = {
          registeredId: user.registeredId,
          publicName: user.publicName,
          contactNo: user.contactNo,
          postalAddress: user.postalAddress,
          registeredAt: user.registeredAt
        }
      }
    }).catch((err:any) => {
      console.log(err);
    })
  }

  ngOnDestroy() {

  }

  p1 = (id: string) => {
    return new Promise((resolve, reject) => {
      this.subS1 = this.authService.getRLRUserInfo(id).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    });
  }

}
