import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

export class PhoneNumber {
  // country: string;
  area: string = '+84';
  // prefix: string;
  line: string;
  get e164() {
    // const num = this.country + this.area + this.prefix + this.line
    const num = this.area + this.line
    return `${num}`
  }
}
import { WindowService } from 'src/app/services/window.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'angular-phone-verification';
  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  isSentOtp = false;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(
    private win: WindowService,
    public router: Router,
    ) { 
    const firebaseConfig = environment.firebase;
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(result => {
      this.windowRef.confirmationResult = result;
      this.isSentOtp = true;
    })
    .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then( result => {
      this.user = result.user;
      if (this.user) {
        localStorage.setItem("user",this.user?.uid);
        let now = new Date();
        localStorage.setItem('session', this.addMinutes(now, 30).getTime().toString());
        this.router.navigate(['question']);
      }
    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }

  addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
  }

  back() {
    this.isSentOtp = false
    this.windowRef.recaptchaVerifier.render()
  }
}
