import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { FoodItem } from './food-item.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  formData: Order;
  orderItems: OrderItem[];
  foodList: FoodItem[];

  constructor(private http: HttpClient) { }

  getFoodItems() {
    return this.http.get("http://localhost:8080/foodItems");

  }
  getOrderItems() {
    return this.http.get("http://localhost:8080/lignecommands");
  }

 
  registerOrders(order: Order) {
    return this.http.post("http://localhost:8080/commandes",order);
  }
  registerOrderItems(orderItem: OrderItem) {
    return this.http.post("http://localhost:8080/lignecommands", orderItem);
  }

}
