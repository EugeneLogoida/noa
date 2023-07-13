import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories.interface';
import { IProductResponse } from 'src/app/shared/interfaces/products.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ImageUploadService } from 'src/app/shared/services/imageUpload/image-upload.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {


  public adminProducts: Array<IProductResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];
  public productsForm!: FormGroup;
  public isUploaded = false;
  public editStatus = false;
  
  private currentProductId!: number | string;
  

  constructor(
    private ImageUploadService: ImageUploadService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    
  ) {}

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProducts();
  }
  initProductForm(): void {
    this.productsForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      allergens: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1],
    });
  }
  loadCategories(): void {
    this.categoriesService.getAll().subscribe((data) => {
      console.log(data);
      this.adminCategories = data as ICategoryResponse[];
      this.productsForm.patchValue({
        category: this.adminCategories[0].name
      })
    });
  }

  loadProducts(): void {
    this.productsService.getAll().subscribe((data) => {
      this.adminProducts = data as IProductResponse[];
    });
  }

  



  addProduct(): void {
    if (this.editStatus) {
      this.productsService
        .update(this.productsForm.value, this.currentProductId as string)
        .then(() => {
          this.loadProducts();
        });
    } else {
      this.productsService.create(this.productsForm.value).then();
    }
    this.editStatus = false;
    this.productsForm.reset();
    this.isUploaded = false;
  }

  editProduct(product: IProductResponse): void {
    this.productsForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      allergens: product.allergens,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
      count: product.count,
    });
    this.editStatus = true;
    this.currentProductId = product.id as number;
    this.isUploaded = true;
  }

  deleteProduct(product: IProductResponse): void {
    this.productsService.delete(product.id as string).then(() => {
      this.loadProducts();
    });
  }




  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageUploadService.uploadFile('images', file.name, file)
      .then((data) => {
        this.productsForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(): void {
    this.ImageUploadService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.productsForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.productsForm.get(control)?.value;
  }



}
