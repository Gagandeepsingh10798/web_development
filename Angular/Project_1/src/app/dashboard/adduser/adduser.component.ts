import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  data: any;
  param: any;

  // registration form-group with validations
  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$')]],
    confirmPassword: ['', [Validators.required]]
  }, {validator: this.checkPasswords });
 // registration form-group with validations



 // confirm password custom validation
  checkPasswords(group: FormGroup) {
  const pass = group.get('password').value;
  const confirmPass = group.get('confirmPassword').value;
  return pass === confirmPass ? null : { notSame: true };
}
// confirm password custom validation
// tslint:disable-next-line: max-line-length
constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private service: AdminService, private toastr: ToastrService) { } // constructor
// get functions of form
get email() {return this.registerForm.get('email'); }
get firstName() {return this.registerForm.get('firstName'); }
get lastName() {return this.registerForm.get('lastName'); }
get password() {return this.registerForm.get('password'); }
get confirmPassword() {return this.registerForm.get('confirmPassword'); }
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

    this.registerForm.get('firstName').markAsTouched();
    this.registerForm.get('lastName').markAsTouched();
    this.registerForm.get('email').markAsTouched();
    this.registerForm.get('password').markAsTouched();

  } else {

    // register user service hit
    this.service.registerUser({


      f_name: this.registerForm.value.firstName,
      l_name: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password

  })
.subscribe((res) => {
  if (res.status === 400) {
    this.showError(res.message);
  } else {
  this.showSuccess(res.message);
  this.router.navigate([`${'/dashboard/users'}`]); }
});

// register user service hit


  }
}

// signup button function


onSubmits() {
  console.log('asdasdasdasdasd');
  if ( this.registerForm.get('firstName').invalid ||
  this.registerForm.get('lastName').invalid ||
  this.registerForm.get('email').invalid) {

    this.registerForm.get('firstName').markAsTouched();
    this.registerForm.get('lastName').markAsTouched();
    this.registerForm.get('email').markAsTouched();

  } else {
  
  this.service.updateUserr(this.data._id, {
    f_name: this.registerForm.value.firstName,
    l_name: this.registerForm.value.lastName,
    email: this.registerForm.value.email
  }).subscribe((resp) => {
    if (resp.status === 200) {
      this.showSuccess(resp.message);
      this.router.navigate([`${'/dashboard/users'}`]);

    } else {
     if(resp.data[0].email == this.registerForm.value.email){
      this.showError('user already updated with same values');
      this.router.navigate([`${'/dashboard/users'}`]);
     }
     else{
      this.showError(resp.message);
     }
      
    }
  });
}
}




  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('id');
    if (this.param !== null) {
      this.service.getUserr({
        _id: this.param
      }).subscribe((res) => {
        this.data = res.data;
      });
    }
  }


}
