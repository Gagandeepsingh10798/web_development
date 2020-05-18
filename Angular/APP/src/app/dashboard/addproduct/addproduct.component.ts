import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
    pImage: ['', Validators.required],
    pPrice: ['', Validators.required]
  });
 // registration form-group with validations



 
// tslint:disable-next-line: max-line-length
constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private service: AdminService, private toastr: ToastrService) { } // constructor
// get functions of form
get pName() {return this.registerForm.get('pName'); }
get pDesc() {return this.registerForm.get('pDesc'); }
get pImage() {return this.registerForm.get('pImage'); }
get pPrice() {return this.registerForm.get('pPrice'); }
// toaster service call
showSuccess(data: any) {
  this.toastr.success(data);
}
showError(data: any) {
  this.toastr.error(data);
}
// toaster service call
 // get functions of form


// signup button function
onSubmit() {
  if (this.registerForm.invalid ) {

    this.registerForm.get('pName').markAsTouched();
    this.registerForm.get('pDesc').markAsTouched();
    this.registerForm.get('pImage').markAsTouched();
    this.registerForm.get('pPrice').markAsTouched();

  } else {

    console.log(this.registerForm.value.pPrice)
    // register user service hit
    this.service.registerProduct({


      p_name: this.registerForm.value.pName,
      p_desc: this.registerForm.value.pDesc,
      p_image: this.registerForm.value.pImage,
      p_price: this.registerForm.value.pPrice,

  })
.subscribe((res) => {
  if (res.status === 400) {
    this.showError(res.message);
  } else {
  this.showSuccess(res.message);
  this.router.navigate([`${'/dashboard/products'}`]); }
});

// register user service hit


  }
}

// signup button function


onSubmits() {
  if ( this.registerForm.get('pName').invalid ||
  this.registerForm.get('pDesc').invalid ||
  this.registerForm.get('pImage').invalid ||
  this.registerForm.get('pPrice').invalid) {

    this.registerForm.get('pName').markAsTouched();
    this.registerForm.get('pDesc').markAsTouched();
    this.registerForm.get('pImage').markAsTouched();
    this.registerForm.get('pPrice').markAsTouched();

  } else {
  
  this.service.updateProduct(this.data._id, {
    p_name: this.registerForm.value.pName,
    p_desc: this.registerForm.value.pDesc,
    p_image: this.registerForm.value.pImage,
    p_price: this.registerForm.value.pPrice
  }).subscribe((resp) => {
      this.showSuccess(resp.message);
      this.router.navigate([`${'/dashboard/products'}`]);
  });
}
}




  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    if (this.param !== null) {
      this.service.getProduct({
        _id: this.param
      }).subscribe((res) => {
        this.data = res.data[0];
      });
    }
  }


}
