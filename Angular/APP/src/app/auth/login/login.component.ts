import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // login form group
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required]]
  });
  // login form group

  // forgot form group
  forgotForm = this.fg.group({
    emailf: ['', Validators.required]
  });
 // forgot form group


  // constructor
  // tslint:disable-next-line: max-line-length
  constructor( private cookieService: CookieService, private fg: FormBuilder, private fb: FormBuilder, private router: Router, private service: AdminService, private toastr: ToastrService) { }
  // constructor

  // getters
  get email() {return this.loginForm.get('email'); }
  get password() {return this.loginForm.get('password'); }
  get emailf() {return this.forgotForm.get('emailf'); }
  // getters

// toaster service call
showSuccess(data: any) {
  this.toastr.success(data);
}
showError(data: any) {
  this.toastr.error(data);
}
// toaster service call



// cookie function

addCookie(data: any) {

  this.cookieService.put('token', data );

}
getCookie() {

  return this.cookieService.get('token');

}
// cookie function
  // submit form action function
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
    } else {  this.service.loginUser({
              email: this.loginForm.value.email,
              password: this.loginForm.value.password
      }).subscribe((res) => {
        console.log(res.message);
        if (res.status === 400) {
          this.showError(res.message);
        } else {
        this.addCookie(res.data);
        this.service.getUser().subscribe(( resp ) => {
          if (resp.status === 401) {
            this.showError(resp.message);
          } else {
            this.showSuccess('Login successfull');
            this.router.navigate([`${'/dashboard'}`]);
          }
        });
        }
      });

      
       }
  }
// submit form action function

// forgot password submit
onSubmits() {

  if (this.forgotForm.invalid) {
    this.showError('enter email');
    this.forgotForm.get('emailf').markAsTouched();
  } else {
    this.showSuccess('Check Your Email'); }
}
// forgot password submit


  ngOnInit(): void {
  }

}
