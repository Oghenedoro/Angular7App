import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { FoodItem } from './food-item.model';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  orderItemForm: OrderItem;
  formData: Order;
  orderItems: OrderItem[];
  foodItem: FoodItem;
  client: Client;

  constructor(private http: HttpClient) { }

  getFoodItems() {
    return this.http.get("http://localhost:8080/foodItems");

  }
  getOrderItems() {
    return this.http.get("http://localhost:8080/lignecommands");
  }

  getOrderById(id: number): any {
    return this.http.get("http://localhost:8080/commandeinfos/"+id);
  }

  getOrdersAndDetails(){
    return this.http.get("http://localhost:8080/commandeinfos"); 
   }

   getOrdersOnly(){
    return this.http.get("http://localhost:8080/onlycommande"); 
   }
  registerOrderItems(orderItem: OrderItem) {
    return this.http.post("http://localhost:8080/lignecommands", orderItem);
  }
  getClients(){
    return this.http.get("http://localhost:8080/clients");
  }
  registerOrder()
  {
    //return this.http.post(`${this.endpoint}/account/login`,payload, { ...options, responseType: 'text' })
    //var headers = new Headers({'Content-Type': 'application/json'});
    var body = {
      ...this.formData,
      articles: this.orderItems
    };
    return this.http.post("http://localhost:8080/commandes/",body);
  
 }

 deletOrderItems(id: number) {
  return this.http.delete("http://localhost:8080/commandeinfos/"+id);
}

}