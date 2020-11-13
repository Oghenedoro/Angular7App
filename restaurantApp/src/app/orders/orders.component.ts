import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';
import jsPDF from 'jspdf';
import { RestaurantService } from '../shared/restaurant.service';

//PDF npm install jspdf html2canvas --save
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

 // @ViewChild('htmlData') htmlData:ElementRef;

  orderList: any=[];
  orderDtails: any=[];

  constructor(private router: Router,
    private service: RestaurantService) { }

  ngOnInit() {
    this.getOnlyOrders();
    this.getOrdersAndDetails();
  }

  openForEditOrder(idCommande: number){
   this.router.navigateByUrl('/order/edit/'+idCommande)
  }

  getOnlyOrders(){
    this.service.getOrdersOnly().subscribe(data =>{
      this.orderList = data;
      console.log(this.orderDtails)
    },err =>{console.log(err)})
  }

  getOrdersAndDetails(){
    this.service.getOrdersAndDetails().subscribe(data =>{
      this.orderDtails = data;
    },err =>{console.log(err)})
  }

  onOrderItemDelete(id: number){
    if(confirm("Do you want to delet it ?"))
    this.service.deletOrderItems(id).subscribe(data =>{
     this.getOrdersAndDetails();
    },err =>{console.log(err)})
  }
 /*
  public openPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    doc.fromHTML(DATA.innerHTML,15,15);
    doc.output('dataurlnewwindow');
  }
  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');
    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });
    doc.save('angular-demo.pdf');
  }
*/
  public downloadPDF():void {
    var element = document.getElementById('tabOrder');

    html2canvas(element).then((canvas) =>{
      var imgPhoto = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      var imageHeight = canvas.height * 250 / canvas.width;
      doc.addImage(imgPhoto,0,0,208,imageHeight);
      doc.save("image.pdf");
    }) 
  }

  public downloadPDF2():void {
    var elem = document.getElementById('tabOrderItems');

    html2canvas(elem).then((canvas) =>{
      var imgPhoto = canvas.toDataURL('image/jpg');
      var doc = new jsPDF();
      var imageHeight = canvas.height * 250 / canvas.width;
      doc.addImage(imgPhoto,0,0,208,imageHeight);
      doc.save("image.pdf");
    }) 
  }
}
