import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-reg-side-bar',
  templateUrl: './reg-side-bar.component.html',
  styleUrls: ['./reg-side-bar.component.css']
})
export class RegSideBarComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.toggleSideBar();
    this.commonService.setNavDeactive();
  }

}
