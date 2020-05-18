import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserheaderService {

  wishlist = 0;
  cart = 0;
  products = [];
  prices = [];
  quant = [];
  totals = []
  constructor() { }

  getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}


  getcart(){
    return this.cart;
  }

  getproducts(){
    var prods = [];
    prods = Array.from(new Set(this.products));
    for(var i=0;i<prods.length;i++){
      console.log(prods[i])
      this.quant[i] = this.getOccurrence(this.products,prods[i]);
    }
    this.prices = Array.from(new Set(this.prices));
    for(var i=0;i<prods.length;i++){
      this.totals[i] = (this.quant[i]*this.prices[i]);
      prods[i] = {name:prods[i],price:this.prices[i],quant:this.quant[i], total:(this.quant[i]*this.prices[i]) }
    }
    return prods;
  }

  getbill(){
    var count = 0;
    
    for(var i=0;i<this.totals.length;i++){
      count+=parseInt(this.totals[i])
    }
    return count;
  }
  
  getwishlist(){
    return this.wishlist;
  }

  setcart(product:any){
    this.cart = this.cart  + 1;
    this.products.push(product.name);
    this.prices.push(product.price);
  }

  setwishlist(products:any){
    this.wishlist+=products;
  }

}
