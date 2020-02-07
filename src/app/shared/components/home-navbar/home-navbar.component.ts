import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.setNavDeactive();
    this.commonService.setScrollPageAnimation();
  }

  isNotHomeRoute():boolean {
    let route = this.router.url.split("/")[2];
    return route != undefined && route.length > 0;
  }

}
