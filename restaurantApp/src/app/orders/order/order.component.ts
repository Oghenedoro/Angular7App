import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../shared/restaurant.service';

import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OrderItem } from '../../shared/order-item.model';
import { OrderItemComponent } from '../order-item/order-item.component';
import { Client } from '../../shared/client.model';
import { Order } from 'src/app/shared/order.model';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {


  private orderItems: OrderItem[];
  private orderItemForm: OrderItem;
  private clientList;
  private orderList;
  private order;
  private orderItem;
  //privatecommRef;

  constructor(private restaurantService: RestaurantService,
     private dialog: MatDialog,
     private router: Router,
     private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getClientList();

    let orderId = this.actRoute.snapshot.paramMap.get('id');
    if(orderId == null)
    this.resetForm();
    else{
      this.restaurantService.getOrderById(parseInt(orderId)).subscribe(res =>{
        this.order = res;
        console.log(this.order)
       this.restaurantService.formData = this.order;
      })
    }
  }
  getClientList() {
    this.restaurantService.getClients().subscribe(data =>{
      this.clientList = data as Client[]
    },
    err =>{console.log(err)},
    () => {console.log("success")}
    )
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
      idCommand: null,
      idfoodItem: 0,
      refCommande: 0,
      idClient: 0,
      payMethod: '',
     // nom: '',
     // client: null,
      grandTotal: 0
     }
    this.restaurantService.orderItems = [];
   }

   genNumber(){
    this.restaurantService.formData.refCommande = Math.floor(1000 + Math.random() * 9000);
   }

  AddOrEditOrderItem(orderItemindex, idCommand) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemindex, idCommand };
    this.dialog.open(OrderItemComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }

  onDeletOrderItem(ligneCmdId:number, i:number) {
    this.restaurantService.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.restaurantService.formData.grandTotal = this.restaurantService.orderItems.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0);
    this.restaurantService.formData.grandTotal = parseFloat(this.restaurantService.formData.grandTotal.toFixed(2));
  }

  onSubmit(form: NgForm) {
    this.router.navigateByUrl('orders');
    this.restaurantService.registerOrder().subscribe(data => {
       this.resetForm();
       
      })
  }
  
    //.pipe(map((response: any) => response.json()));
  //public getIdFoodItem(){
    
    //let items: IterableIterator<OrderItem> = this.restaurantService.orderItems.values();
    //for(let item of items){
    //  this.orderItemForm.idfoodItem = item.idfoodItem;
  //  return this.orderItemForm.idfoodItem;
   // }
 // }
}
