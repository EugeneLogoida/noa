import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  public collapseStatus = true;
  public productsList: Array<IProductResponse> = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts():void{
    this.productsService.getAll().subscribe(data=>{
      this.productsList = data as IProductResponse[]; console.log(this.productsList);
      
    })
  }

  quantityChange(product: IProductResponse ,value: boolean){
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  collapse():void{
    this.collapseStatus = !this.collapseStatus
  }



}
