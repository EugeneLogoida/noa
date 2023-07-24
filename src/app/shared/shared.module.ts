import { NgModule } from '@angular/core'

import { MatDialogModule } from '@angular/material/dialog';


const MATERIAL = [
  MatDialogModule
]

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[],
    imports:[
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ],
    exports:[
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
    ]
})
export class SharedModule {  }
