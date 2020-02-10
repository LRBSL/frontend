import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Chart from 'chart.js';
import { BlockchainService } from 'src/app/shared/services/blockchain.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countOngoingTransactions: number;
  countRegisteredNotaries: number;
  countLands: number;

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('[data-bs-chart]').each(function(index, elem) {
        this.chart = new Chart($(elem), $(elem).data('bs-chart'));
      });
    });

    this.countOngoingTransactions = this.blockchainService.getOngoingTransactionCount();
    this.countRegisteredNotaries = this.blockchainService.getRegisteredNotaryCount();
    this.countLands = this.blockchainService.getLandsCount();
    setTimeout(() => {
      this.countOngoingTransactions = this.blockchainService.getOngoingTransactionCount();
    }, 20000);
  }

}
