import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/products.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  public currentProduct!: IProductResponse;
  public productList: Array<IProductResponse> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadOneProduct();
    this.loadProducts()
  }
  loadOneProduct(): void {
    const path = String(this.activatedRoute.snapshot.paramMap.get('path'));
    this.productsService.getOne(path).then((data) => {
      this.currentProduct = data as IProductResponse;
    });
  }
  

  // Load all products except main one

  loadProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.productList = data as IProductResponse[];

      // this.productList = this.productList.filter(
      //   (item) => item.path !== this.currentProduct.path
      // );
      console.log(this.productList);
    });
  }

  quantityChange(product: IProductResponse ,value: boolean){
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }
}
