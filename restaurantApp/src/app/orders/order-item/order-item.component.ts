import { Component, OnInit, Inject } from '@angular/core';
import { RestaurantService } from '../../shared/restaurant.service';
import { OrderItem } from '../../shared/order-item.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: []
})
export class OrderItemComponent implements OnInit {

  private orderItemsList: OrderItem[];
  private orderItemForm: OrderItem;
  private isValid: boolean=true;  

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getOrderItems();
   
    this.orderItemForm = {
      idLigneCommande: 0,
      idCommand: this.data.idCommand,
      refCommande: 0,
      prix: 0,
      itemName: '',
      quantity: 0,
      total: 0

    }
    this.updateTotalField();
  }
  updateOrderItemFields(pp) {
    if (pp.selectedIndex == 0) {
      this.orderItemForm.prix = 0;
      this.orderItemForm.itemName = '';
      this.orderItemForm.total = 0;
      this.orderItemForm.quantity = 0;


    } else {
      this.orderItemForm.prix = this.orderItemsList[pp.selectedIndex - 1].prix;
      this.orderItemForm.itemName = this.orderItemsList[pp.selectedIndex - 1].itemName;
      this.orderItemForm.total = this.orderItemsList[pp.selectedIndex - 1].total;
      this.orderItemForm.quantity = this.orderItemsList[pp.selectedIndex - 1].quantity;
     
      
    }
  }

  updateTotalField() {
    this.orderItemForm.total = this.orderItemForm.prix * this.orderItemForm.quantity;
  }

  getOrderItems() {
    this.restaurantService.getOrderItems().subscribe(
      res => {
        this.orderItemsList = res as OrderItem[];
       },
      error => { console.log("Error occurred !") },
      () => { console.log("Successful !") }
    );
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {

      this.restaurantService.orderItems.push(form.value);
      this.dialogRef.close();
    }
        
  }

  validateForm(orderItemForm: OrderItem) {
    this.isValid = true;
    if (orderItemForm.itemName == '')
      this.isValid = false;
    else if (this.orderItemForm.quantity == 0)
      this.isValid = false;
    return this.isValid;
  }
 }

