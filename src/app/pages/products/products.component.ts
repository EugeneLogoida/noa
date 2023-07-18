import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories.interface';
import { IProductResponse } from 'src/app/shared/interfaces/products.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  private eventSubscription!: Subscription;
  public currList: Array<IProductResponse> = [];
  public categoriesMainList: Array<ICategoryResponse> = [];
  public categoriesThaiList: Array<ICategoryResponse> = [];

  public mainMenuBool = true;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.loadProducts();

      }
    });
  }

  ngOnInit(): void {
    
    this.loadCategories();
  }
  loadProducts() {
    this.currList = [];
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    console.log(categoryName);

    this.productsService.getAll().subscribe((data) => {
      data.forEach((product) => {
        if (product.category.path == categoryName) {
          this.currList.push(product as IProductResponse);


          if(product.category.affiliation) this.mainMenuBool = true
          else if(!product.category.affiliation) this.mainMenuBool = false
        }
        
      });
    });
  }

  loadCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      data.forEach((category) => {
        if (category.affiliation == true) {
          this.categoriesMainList.push(category as ICategoryResponse);
        } else if (category.affiliation == false) {
          this.categoriesThaiList.push(category as ICategoryResponse);
        }
      });
    });
  }

  quantityChange(product: IProductResponse, value: boolean) {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }
}
