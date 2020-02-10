import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-surveyor-side-bar',
  templateUrl: './surveyor-side-bar.component.html',
  styleUrls: ['./surveyor-side-bar.component.css']
})
export class SurveyorSideBarComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.toggleSideBar();
    this.commonService.setNavDeactive();
  }

}
