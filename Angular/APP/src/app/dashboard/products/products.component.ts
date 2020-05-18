import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
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
delProduct(data: any) {
  this.service.delProd({
    _id: data
  }).subscribe((res) => {
if (res.status === 200) {
  this.showSuccess(res.message);
  this.service.getProds().subscribe((resp) => {

    this.data = resp.data;
  });
} else {

  this.showError(res.message);

}
  });
}
// delete user

  ngOnInit(): void {
    this.service.getProds().subscribe((res) => {
      this.data = res.data;
    });
  }

}
