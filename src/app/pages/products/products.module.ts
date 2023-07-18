import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductInfoComponent } from './product-info/product-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
    ProductInfoComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
