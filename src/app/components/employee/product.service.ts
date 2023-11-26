import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }
    getProducts() {
        return this.http.get<any>('assets/products.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
