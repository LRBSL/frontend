import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  loading_status: string;
  triple_dot: string = "\xa0\xa0\xa0\xa0\xa0\xa0";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let dot_count: number = 0;
    setInterval(() => {
      if(dot_count == 0) {
        dot_count++;
        this.triple_dot = "\xa0.\xa0\xa0\xa0\xa0";
      } else if(dot_count == 1) {
        dot_count++;
        this.triple_dot = "\xa0.\xa0.\xa0\xa0";
      } else if(dot_count == 2) {
        dot_count++;
        this.triple_dot = "\xa0.\xa0.\xa0.";
      } else {
        dot_count = 0;
        this.triple_dot = "\xa0\xa0\xa0\xa0\xa0\xa0";
      }
    }, 1000);
  }
}
