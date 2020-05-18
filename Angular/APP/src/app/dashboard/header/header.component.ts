import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookie: CookieService, private router: Router, private toastr: ToastrService) { }
// toaster service call
showSuccess(data: any) {
  this.toastr.success(data);
}
showError(data: any) {
  this.toastr.error(data);
}
// toaster service call
  logout(){
    this.cookie.remove('token');
    Cookie.deleteAll();
    if(this.cookie.get('token')){
      this.showError('logout unsuccessfull');
    }
    else{
      this.showSuccess('logout successfull');
      this.router.navigateByUrl('/');
    }
    
  }
  ngOnInit(): void {
  }

}
