import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupReplyComponent } from './popup-reply/popup-reply.component';
import { CommunicationsService } from 'src/app/services/communications.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit {

  roleList = [
    { code: 'chef', name: 'Đầu bếp' },
    { code: 'customer', name: 'Khách hàng' },
    { code: 'manager', name: 'Quản lý' },
    { code: 'receptionist', name: 'Thu ngân' },
    { code: 'waiter', name: 'Bồi bàn' },
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
    this. getListQuestion('chef');
    this. getListQuestion('customer');
    this. getListQuestion('receptionist');
    this. getListQuestion('waiter');
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
      if (type == 'chef') {
        this.listQuestionKitchen = data;
      }
      if (type == 'customer') {
        this.listQuestionCustomer = data;
      }
      if (type == 'waiter') {
        this.listQuestionWaiter = data;
      }
      if (type == 'receptionist') {
        this.listQuestionReceptionist = data;
      }
    } else {
      if (type == 'chef') {
        this.listQuestionKitchen = this.dataFakeKitchen;
      }
      if (type == 'customer') {
        this.listQuestionCustomer = this.dataFakeCustomer;
      }
      if (type == 'waiter') {
        this.listQuestionWaiter = this.dataFakeWaiter;
      }
      if (type == 'receptionist') {
        this.listQuestionReceptionist = this.dataFakeReceptionist;
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
    });
  }
}
