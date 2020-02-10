import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('[data-bs-chart]').each(function(index, elem) {
        this.chart = new Chart($(elem), $(elem).data('bs-chart'));
      });
    
    });
  }

}
