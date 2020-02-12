import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit, OnDestroy {

  loading_status: string;
  triple_dot: string = "\xa0\xa0\xa0\xa0\xa0\xa0";

  private subsLoginUserBackend: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.tripleDotAnimation();
    this.getCurrentAuthUserData().then((authUser: any) => {
      this.authService.loginUserBlockchain(authUser.regId).then(() => {
        this.authService.currentUser = authUser;
        if(authUser.type == "rlr") { this.router.navigate(["/lrbsl-rlr"]); }
        if(authUser.type == "notary") { this.router.navigate(["/lrbsl-notary"]); }
        if(authUser.type == "surveyor") { this.router.navigate(["/lrbsl-surveyor"]); }
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error))
  }

  ngOnDestroy() {
    this.subsLoginUserBackend.unsubscribe();
  }

  getCurrentAuthUserData() {
    return new Promise<object>((resolve, reject) => {
      this.subsLoginUserBackend = this.authService.loginUserBackend().subscribe((result: any) => {
        if(result.success && result.data != null) {
          resolve(result.data);
        } else {
          reject(result.error);
        }
      });
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
