import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { DeliveryHistoryComponent } from './delivery-history/delivery-history.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserFavoritesComponent } from './user-favorites/user-favorites.component';

const routes: Routes = [
  {
    path: '', component: CabinetComponent, children:[
      {
        path: 'favorites', component: UserFavoritesComponent
      },
      {
        path: 'user-data', component: UserDataComponent
      },
      {
        path: 'password-change', component: PasswordChangeComponent
      },
      {
        path: 'delivery-history', component: DeliveryHistoryComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
