import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
data: any;
  constructor( private service: AdminService, private toastr: ToastrService) { }
  // toaster service call
  showSuccess(data: any) {
    this.toastr.success(data);
  }
  showError(data: any) {
    this.toastr.error(data);
  }
  // toaster service call


  // delete user
delUser(data: any) {
  this.service.delUser({
    _id: data
  }).subscribe((res) => {
if (res.status === 200) {
  this.showSuccess(res.message);
  this.service.getUsers().subscribe((resp) => {

    this.data = resp.data;
  });
} else {

  this.showError(res.message);

}
  });
}
// delete user



  ngOnInit(): void {
    this.service.getUsers().subscribe((res) => {
      this.data = res.data;
    });
  }

}
