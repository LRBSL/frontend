import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  loading_status: string;
  triple_dot: string = "\xa0\xa0\xa0\xa0\xa0\xa0";
  alert_type: string;
  alert_content: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private commonService: CommonService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-home.min.css");
    this.tripleDotAnimation();
    this.authService.loginUserBlockchain().then(() => {
      if (this.authService.currentUser.type == "rlr") { this.router.navigate(["/lrbsl-rlr"]); }
      if (this.authService.currentUser.type == "notary") { this.router.navigate(["/lrbsl-notary"]); }
      if (this.authService.currentUser.type == "surveyor") { this.router.navigate(["/lrbsl-surveyor"]); }
    }).catch((error) => {
      this.alert_type = "error";
      this.alert_content = "Blockchain authentication failed. Redirect to Home Page";
      this.document.getElementById("openAlertBoxButton").click();
      setTimeout(() => {
        window.location.href = "/lrbsl";
      }, 5000);
    });
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
}
