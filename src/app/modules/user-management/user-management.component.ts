import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopupRegisterComponent } from './popup-register/popup-register.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: any;
  listUser: Array<any> = [];
  searchForm: any;
  isHost = false;
  constructor(
    public router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl("", null),
    });
  }

  openModalRegister() {
    let dialogRef = this.dialog.open(PopupRegisterComponent, {
      width: '500px',
      height: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getAllUser() {
    let param: any = {
      searchValue: this.searchForm.value.name,
    }
    // this.userService.getAllUser(param).subscribe(res => {
    //   if (res) {
    //     this.listUser = res;
    //   }
    // })
  }


}
