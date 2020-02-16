import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../../services/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit, OnDestroy {

  loading_status: string;
  triple_dot: string = "\xa0\xa0\xa0\xa0\xa0\xa0";
  alert_type: string;
  alert_content: string;

  subS1: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-home.min.css");
    this.tripleDotAnimation();
    this.p1(this.authService.currentAuthUser.email, this.authService.currentAuthUser.password).then((res: any) => {
      if (res.success) {
        let user = res.data;
        this.authService.currentUser = {
          id: user.id,
          email: user.emailAddress,
          type: user.type,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
        if (res.data.type == "r") { this.router.navigate(["/lrbsl-rlr"]); }
        if (res.data.type == "n") { this.router.navigate(["/lrbsl-notary"]); }
        if (res.data.type == "s") { this.router.navigate(["/lrbsl-surveyor"]); }
      }
    }).catch((err: any) => {
      this.alert_type = "error";
      this.alert_content = "Blockchain authentication failed. Redirect to Home Page";
      this.document.getElementById("openAlertBoxButton").click();
      setTimeout(() => {
        window.location.href = "/lrbsl";
      }, 5000);
    });
  }

  ngOnDestroy() {
    this.subS1.unsubscribe();
  }

  tripleDotAnimation() {
    let dot_count: number = 0;
    setInterval(() => {
      if (dot_count == 0) {
        dot_count++;
        this.triple_dot = "\xa0.\xa0\xa0\xa0\xa0";
      } else if (dot_count == 1) {
        dot_count++;
        this.triple_dot = "\xa0.\xa0.\xa0\xa0";
      } else if (dot_count == 2) {
        dot_count++;
        this.triple_dot = "\xa0.\xa0.\xa0.";
      } else {
        dot_count = 0;
        this.triple_dot = "\xa0\xa0\xa0\xa0\xa0\xa0";
      }
    }, 1000);
  }

  p1 = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      this.subS1 = this.authService.login(email, password).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      })
    });
  }
}
