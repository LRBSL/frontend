import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './rlr-side-bar.component.html',
  styleUrls: ['./rlr-side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.toggleSideBar();
    this.commonService.setNavDeactive();
  }

}
