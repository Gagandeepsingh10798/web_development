import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor( private router: Router, private cookieService: CookieService,  private toastr: ToastrService) { }
// toaster service call
showSuccess(data: any) {
  this.toastr.success(data);
}
showError(data: any) {
  this.toastr.error(data);
}
// toaster service call
  canActivate(): any {

    if(this.cookieService.get('token')){
      return true;
    }
    else{
      this.router.navigateByUrl('/auth/login');
      this.showError('login first')
      return false;
    }
    
  }
}
