import { Component, OnInit, Inject } from '@angular/core';
import { onGoTrList, OnGoTr } from 'src/app/shared/utils/data';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ongoing-transactions',
  templateUrl: './ongoing-transactions.component.html',
  styleUrls: ['./ongoing-transactions.component.css']
})
export class OngoingTransactionsComponent implements OnInit {

  onGoTrs: OnGoTr[] = onGoTrList;
  alert_type: string;
  alert_content: string;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  confirmed() {
    this.alert_type = "success";
    this.alert_content = "Transaction committed successfully. \n New Owner NIC: 234567890V \t Secure Key: 3214";
    this.document.getElementById("openAlertBoxButton").click();
    this.onGoTrs = []
  }

  rejected() {
    this.alert_type = "error";
    this.alert_content = "Transaction rejected.";
    this.document.getElementById("openAlertBoxButton").click();
    this.onGoTrs = []
  }

}
