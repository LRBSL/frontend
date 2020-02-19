import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private commonService: CommonService,
    private authService: AuthService) {
      this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-rlr.min.css");
    }

  ngOnInit() {
    // this.authService.checkCurrentUserExist();
  }

}
