import { Component, Inject, OnInit } from '@angular/core';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupRegisterComponent>,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.registerInfo = new RegisterInfo();
    this.registerInfo.role = 'chef'
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

}
