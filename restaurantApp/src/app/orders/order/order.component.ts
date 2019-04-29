import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../shared/restaurant.service';
import { Order } from '../../shared/order.model';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderItem } from '../../shared/order-item.model';
import { OrderItemComponent } from '../order-item/order-item.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  private orderForm: OrderItem;
  private orderItems: OrderItem[];
  private orderItemForm: OrderItem;

  constructor(private restaurantService: RestaurantService, private dialog: MatDialog) { }

  ngOnInit() {

    this.resetForm();
  }
  
  getOrderItems() {
    this.restaurantService.getOrderItems().subscribe(
      data => { this.orderItems = data as OrderItem[]},
      error => { console.log("Error occurred !") },
      () => { console.log("Successful !") }
    );
  }

  resetForm(form?: NgForm) {
    if(form=null)
    form.resetForm();
    this.restaurantService.formData = {
      idCommand: 0,
      refCommande: 0,
      idClient: 0,
      payMethod: ''
 
    };
    this.restaurantService.orderItems=[];
  }

  AddOrEditOrderItem(orderItemindex, idCommand) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemindex, idCommand };
    this.dialog.open(OrderItemComponent, dialogConfig)
  }

}
