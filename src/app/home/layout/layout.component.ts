import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private commonService: CommonService,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.commonService.loadStyle(this.document, 'bootstrap-theme', "assets/bootstrap/css/bootstrap-home.min.css");
    this.cookieService.deleteAll();
  }
}
