import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-notary-side-bar',
  templateUrl: './notary-side-bar.component.html',
  styleUrls: ['./notary-side-bar.component.css']
})
export class NotarySideBarComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.toggleSideBar();
    this.commonService.setNavDeactive();
  }

}
