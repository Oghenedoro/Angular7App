import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../../shared/food-item.model';
import { RestaurantService } from '../../shared/restaurant.service';


@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  private foodItems: FoodItem[];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.getFoodItems();
  }


  getFoodItems() {
    this.restaurantService.getFoodItems().subscribe(
      data => { this.foodItems = data as FoodItem[]},
      error => { console.log("Error occured ! ") },
      () => { console.log("Successful") }
    );
  }
}
