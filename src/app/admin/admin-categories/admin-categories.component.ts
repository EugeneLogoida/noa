import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ImageUploadService } from 'src/app/shared/services/imageUpload/image-upload.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  public adminCategories: Array<ICategoryResponse> = [];
  public categoriesForm!: FormGroup;
  public isUploaded = false;
  public editStatus = false;
  public currentCategoryId!: number | string;

  public affiliationCheck!:boolean;

  constructor(
    private ImageUploadService: ImageUploadService,
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.initCategoryForm();
  }
  initCategoryForm(): void {
    this.categoriesForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
      affiliation: [null],
    });
  }

  loadCategories(): void {
    this.categoriesService.getAll().subscribe((data) => {
      console.log(data);
      this.adminCategories = data as ICategoryResponse[];
      
    });
  }
  addCategory(): void {
    this.categoriesForm.value.affiliation = this.affiliationCheck;
    if (this.editStatus) {  
      this.categoriesService
        .update(this.categoriesForm.value, this.currentCategoryId as string)
        .then(() => {
          this.loadCategories();
        });
    } else {
      
      
      this.categoriesService.create(this.categoriesForm.value).then();
      console.log(this.categoriesForm.value);
      
    }
    this.editStatus = false;
    this.categoriesForm.reset();
    this.isUploaded = false;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoriesForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
      affiliation: category.affiliation,
    });
    this.affiliationCheck = category.affiliation;
    this.editStatus = true;
    this.currentCategoryId = category.id as number;
    this.isUploaded = true;
    
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoriesService.delete(category.id as string).then(() => {
      this.loadCategories();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageUploadService.uploadFile('images', file.name, file)
      .then((data) => {
        this.categoriesForm.patchValue({
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
        this.categoriesForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.categoriesForm.get(control)?.value;
  }

  ch(status: boolean){
    this.affiliationCheck = status;
    console.log(this.affiliationCheck);
    console.log(this.categoriesForm.value);
    
  }
}
