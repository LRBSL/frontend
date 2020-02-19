import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rlr',
  templateUrl: './rlr.component.html',
  styleUrls: ['./rlr.component.css']
})
export class RlrComponent implements OnInit {

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  alert_type: string;
  alert_content: string;

  notaryRegisterForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required]),
    regId: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  ngOnInit() {
  }

}
