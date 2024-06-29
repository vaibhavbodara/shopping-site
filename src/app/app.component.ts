import { Component } from '@angular/core';
import { SellerService } from './service/seller.service';
import { Product } from './data-type';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecomm-store';
}
