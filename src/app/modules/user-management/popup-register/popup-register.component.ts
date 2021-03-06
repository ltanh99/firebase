import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterInfo } from 'src/app/models/registerInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.css']
})
export class PopupRegisterComponent implements OnInit {

  roleList = [ 
    {code: 'chef', name: 'Đầu bếp'},
    {code: 'customer', name: 'Khách hàng'},
    {code: 'manager', name: 'Quản lý'},
    {code: 'receptionist', name: 'Thu ngân'},
    {code: 'waiter', name: 'Bồi bàn'},
  ]
  registerInfo:RegisterInfo;
  confirmPassword = '';
  isConfirmedPassword = false;
  sessionInfo: any;
  localId: any;
  registerForm: any;
  otpForm: any;
  isShowOtp = false;
  isShowRegister = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupRegisterComponent>,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerInfo = new RegisterInfo();
    this.registerInfo.role = 'chef'
    this.registerForm = new FormGroup({
      phone: new FormControl(null, [Validators.required,Validators.pattern("^[0-9]*$")]),
    });
    this.otpForm = new FormGroup({
      otp: new FormControl(null, [Validators.required,Validators.pattern("^[0-9]*$")]),
    });
  }
  register() {
    if (this.registerInfo) {
      this.registerInfo.phone = '+84' + this.registerInfo.phone;
        this.userService.registerUser(this.registerInfo).subscribe(
          res => {
              this.dialogRef.close();
          },
          error => {
          }
        )
      
    }
  }

  getOtp() {
    if (this.registerForm.valid) {
      this.userService.getOtp('+84' + this.registerForm.value.phone).subscribe(res => {
        if (res) {
          this.sessionInfo = res?.sessionInfo;
          if (this.sessionInfo) {
            this.isShowOtp = true;
          }
        }
      })
    }
  }

  checkOTP() {
    if (this.otpForm.valid) {
      let body = {
        "code": this.otpForm.value.otp,
        "phoneNumber": '+84' + this.registerForm.value.phone,
        "sessionInfo": this.sessionInfo
      }

      this.userService.verifyOtp(body).subscribe(res => {
        if (res) {
          debugger
          this.registerInfo.phone = res.phoneNumber;
          this.registerInfo.id = res.localId;
          this.isShowRegister = true;
        }
      })
    }
  }

  back() {
    this.isShowOtp = false;
  }

}
