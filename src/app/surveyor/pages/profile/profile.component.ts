import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: string;

  profileForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    nic: new FormControl(''),
    regId: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true })
  });

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.name = this.authService.currentUser.firstName + " " + this.authService.currentUser.lastName;
  }

  submitProfile() {
    console.log("Hello")
  }
}