import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  constructor(private commonService: CommonService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.commonService.setScrollPageAnimation();
  }
}
