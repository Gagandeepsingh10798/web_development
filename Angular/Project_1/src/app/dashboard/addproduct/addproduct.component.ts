import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  data: any;
  param: any;

  // registration form-group with validations
  registerForm = this.fb.group({
    pName: ['', [Validators.required, Validators.minLength(3)]],
    pDesc: ['', Validators.required],
    pImage: ['', Validators.required]
   });
 // registration form-group with validations

// tslint:disable-next-line: max-line-length
constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private service: AdminService, private toastr: ToastrService) { } // constructor
// get functions of form
get pName() {return this.registerForm.get('email'); }
get pDesc() {return this.registerForm.get('firstName'); }
get pImage() {return this.registerForm.get('lastName'); }
// toaster service call
showSuccess(data: any) {
  this.toastr.success(data);
}
showError(data: any) {
  this.toastr.error(data);
}
// toaster service call
 // get functions of form




  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    // if (this.param !== null) {
    //   this.service.getUserr({
    //     _id: this.param
    //   }).subscribe((res) => {
    //     this.data = res.data;
    //   });
    // }
  }

}
