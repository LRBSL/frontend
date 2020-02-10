import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sys-navbar',
  templateUrl: './sys-navbar.component.html',
  styleUrls: ['./sys-navbar.component.css']
})
export class SysNavbarComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  async userLogout() {
    await this.authService.logout();
  }

}
