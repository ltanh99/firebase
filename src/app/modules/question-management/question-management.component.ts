import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommunicationsService } from 'src/app/services/communications.service';

import { PopupReplyComponent } from './popup-reply/popup-reply.component';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit {

  roleList = [
    { code: 'Chef', name: 'Đầu bếp' },
    { code: 'Customer', name: 'Khách hàng' },
    { code: 'manager', name: 'Quản lý' },
    { code: 'Receptionist', name: 'Thu ngân' },
    { code: 'Waiter', name: 'Bồi bàn' },
  ]
  listQuestionWaiter = []
  listQuestionKitchen = []
  listQuestionCustomer = []
  listQuestionReceptionist = []

  dataFakeWaiter = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Em xin mẫu đơn nghỉ việc.",
      "userId": "1"
    },
    {
      "id": "4",
      "isSeen": false,
      "message": "Khách quá đông, không phục vụ kịp",
      "userId": "1"
    },
    {
      "id": "2",
      "isSeen": false,
      "message": "Bàn số 30 đã ngồi quá hơn 3 tiếng",
      "userId": "1"
    },
    {
      "id": "3",
      "isSeen": false,
      "message": "Có chuột ở trong kho",
      "userId": "1"
    },
  ];
  dataFakeKitchen = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Chảo không còn chống dính.",
      "userId": "1"
    },
    {
      "id": "2",
      "isSeen": false,
      "message": "Toàn bộ muối đã hết hạn",
      "userId": "1"
    },
    {
      "id": "3",
      "isSeen": false,
      "message": "Cần thêm nhân viên nấu món Pháp",
      "userId": "1"
    },
  ];
  dataFakeCustomer = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Nhân viên Nguyễn A phục vụ kém",
      "userId": "1"
    },
    {
      "id": "2",
      "isSeen": false,
      "message": "Món Pháp quá mặn",
      "userId": "1"
    },
  ];
  dataFakeReceptionist = [
    {
      "id": "1",
      "isSeen": false,
      "message": "Máy in hóa đơn hỏng",
      "userId": "1"
    },
    {
      "id": "1",
      "isSeen": false,
      "message": "Khách yêu cầu thanh toán bằng tài khoản nước ngoài",
      "userId": "1"
    },
  ];
  constructor(
    private dialog: MatDialog,
    private communicationService: CommunicationsService
  ) { }

  ngOnInit(): void {
    this. getListQuestion('Chef');
    this. getListQuestion('Customer');
    this. getListQuestion('Receptionist');
    this. getListQuestion('Waiter');
  }

  getListQuestion(type) {
    let isHaveData = false;
    this.communicationService.getListQuestion(type).subscribe(res => {
        isHaveData = true;
        this.handleData(res, type);
    });
    if (!isHaveData) {
      this.handleData(null, type)
    }
  }

  handleData(data, type) {
    if (data) {
      if (type == 'Chef') {
        this.listQuestionKitchen = data;
      }
      if (type == 'Customer') {
        this.listQuestionCustomer = data;
      }
      if (type == 'Waiter') {
        this.listQuestionWaiter = data;
      }
      if (type == 'Receptionist') {
        this.listQuestionReceptionist = data;
      }
    }
  }

  openModalReply(item,type) {
    item.type = type;
    let dialogRef = this.dialog.open(PopupReplyComponent, {
      width: '1000px',
      height: '350px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      this. getListQuestion('Chef');
      this. getListQuestion('Customer');
      this. getListQuestion('Receptionist');
      this. getListQuestion('Waiter');
    });
  }
}
