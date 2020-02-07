import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user:any;
  ngOnInit() {
    this.user = this.authService.currentAuthUser.username;
  }

}
