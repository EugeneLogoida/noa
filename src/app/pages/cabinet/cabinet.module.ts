import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DeliveryHistoryComponent } from './delivery-history/delivery-history.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CabinetComponent,
    UserDataComponent,
    DeliveryHistoryComponent,
    UserFavoritesComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
