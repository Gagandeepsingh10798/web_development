import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { UserheaderService } from '../services/userheader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: HomeService, private headerservice: UserheaderService) { }
  products = []
  cart = 0;

  getcart(){
    this.cart = this.headerservice.getcart();
  }

  setcart(product:any){
    this.headerservice.setcart(product);
    this.getcart();
  }


  ngOnInit(): void {
     
     this.service.getProdcuts()
.subscribe((res) => {
  this.products = res.data
});

  this.getcart()
  }




}
