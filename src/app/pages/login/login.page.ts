import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../../validators/email';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  labelColor = 'medium';
  iconColor = 'dark';

  pwd: string;

  showPwd = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ngOnInit() {
  }

  login(freighter: boolean): void{
    if (freighter) {
      this.router.navigateByUrl('/freighter/details/1');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
