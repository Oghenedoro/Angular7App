import { Client } from './client.model';
import { OrderItem } from './order-item.model';

export class Order {
  idCommand: number;
  refCommande: number;
  idClient: number;
  payMethod: string;
  idfoodItem : number;
  //nom: string;
  grandTotal: number;
  //client: Client;
 // articles:Array<OrderItem>=[];

}
