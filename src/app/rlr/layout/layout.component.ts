import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  host: {
    id: 'page-top'
  }
})
export class LayoutComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.loadStyle(this.document, "assets/bootstrap/css/bootstrap-rlr.min.css");
  }

}
