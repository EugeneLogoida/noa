import { Component, OnInit } from '@angular/core';
import { ICategoryResponse } from 'src/app/shared/interfaces/categories.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public categoriesList:Array<ICategoryResponse> = []
  public categoriesMainList:Array<ICategoryResponse> = []
  public categoriesThaiList:Array<ICategoryResponse> = []
  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories():void{
    this.categoriesService.getAll().subscribe(data=>{
      this.categoriesList = data as ICategoryResponse[];
      this.categoriesMainList = []
      this.categoriesThaiList = []
      for (const category of this.categoriesList) {
        if(category.affiliation){
          this.categoriesMainList.push(category);
        } else if(!category.affiliation){
          this.categoriesThaiList.push(category);
        }
      }
      
      
    })
  }

  openLoginDialog(){
    this.dialog.open(AuthDialogComponent, {
      panelClass: 'auth-dialog',
      backdropClass: 'dialog-back'
    })
  }


}
