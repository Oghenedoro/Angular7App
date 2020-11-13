import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog'; 
import { map } from 'rxjs/operators'; 

import { AppComponent } from './app.component';
import { OrderItemComponent } from './orders/order-item/order-item.component';

import { FoodItemComponent } from './orders/food-item/food-item.component';
import { RestaurantService } from './shared/restaurant.service';
import { AppRoutingModule } from './app-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemComponent,
    FoodItemComponent    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [OrderItemComponent],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
