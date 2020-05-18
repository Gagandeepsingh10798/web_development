import { Component, OnInit } from '@angular/core';
import { UserheaderService } from '../../services/userheader.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products = []
  bill = 0;
  constructor(private headerservice: UserheaderService) { }

  ngOnInit(): void {
    this.products = []
    this.products = this.headerservice.getproducts();
    this.bill = this.headerservice.getbill();
  }

}
