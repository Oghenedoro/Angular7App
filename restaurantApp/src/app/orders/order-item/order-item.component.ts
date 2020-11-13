import { Component, OnInit, Inject } from '@angular/core';
import { RestaurantService } from '../../shared/restaurant.service';
import { OrderItem } from '../../shared/order-item.model';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { NgForm } from '@angular/forms';
import { FoodItem } from '../../shared/food-item.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styles: []
})
export class OrderItemComponent implements OnInit {
  
  private foodList: FoodItem[];
  private orderItemForm: OrderItem;
  private isValid: boolean=true;  

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemComponent>,
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getFoodItems();

    if (this.data.orderItemindex == null)
      this.orderItemForm = {
        idLigneCommande: null,
        idCommand: this.data.idCommand,
        refCommande: 0,
        prix: 0,
        itemName: '',
        quantity: 0,
        idFoodItem: 0,
        total: 0
      }
    else {
    this.orderItemForm = Object.assign({}, this.restaurantService.orderItems[this.data.orderItemindex]);
    }
  }
  updateOrderItemFields(pp) {
    if (pp.selectedIndex == 0) {
      this.orderItemForm.prix = 0;
      this.orderItemForm.itemName = '';     
    } else {
      this.orderItemForm.prix = this.foodList[pp.selectedIndex - 1].prix;
      this.orderItemForm.itemName = this.foodList[pp.selectedIndex - 1].name;

    }
  }
  //parseFloat(this.restaurantService.formData.gTotal.toFixed(2));
  updateTotalField() {
    this.orderItemForm.total = parseFloat((this.orderItemForm.prix * this.orderItemForm.quantity).toFixed(2));
  }
 
  getFoodItems() {
    this.restaurantService.getFoodItems().subscribe(
      res => {
        this.foodList = res as FoodItem[];
       },
      error => { console.log("Error occurred !") },
      () => { console.log("Successful !") }
    );
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      if (this.data.orderItemindex == null)
        this.restaurantService.orderItems.push(form.value);
      else {
        this.restaurantService.orderItems[this.data.orderItemindex] = form.value;
        
      }
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

