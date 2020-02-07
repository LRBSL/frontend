import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  constructor(private commonService: CommonService) { }

  contactForm = new FormGroup({
    name: new FormControl(''),
    subject: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl('')
  }); 

  ngOnInit() {
  }

  ngOnDestroy() {
    this.commonService.setScrollPageAnimation();
  }
}
