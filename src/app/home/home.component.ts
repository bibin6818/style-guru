import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  insideHome:boolean = true

  allProducts:any = []
  searchKey:string = ""

constructor(private api:ApiService,private toaster:ToastrService){}

ngOnInit():void{
  this.api.getAllProductsAPI().subscribe((result:any)=>{
    this.allProducts = result
    console.log(this.allProducts)
  })
  this.api.searchKey.subscribe((res:any)=>{
    this.searchKey = res
  })
}
addToWishlist(product:any){
if(sessionStorage.getItem("token")){
  //addToWishlist
  this.api.addToWishlistAPI(product).subscribe({
    next:(result:any)=>{
      this.toaster.success(`Product${result.title} added to your wishlist!!!`)
    },
    error:(reason:any)=>{
      console.log(reason)
      this.toaster.warning(reason.error)
    }
  })
}else{
  this.toaster.info("Please login")
}
}
addToCart(product:any){
  if(sessionStorage.getItem("token")){
    //addToCart
    product.quantity = 1
    this.api.addToCartAPI(product).subscribe({
      next:(result:any)=>{
        this.toaster.success(result)
        this.api.getCartCount()
      },
      error:(reason:any)=>{
        console.log(reason)
        this.toaster.warning(reason.error)
      }
    })
  }else{
    this.toaster.info("Please login")
  }
}
}
