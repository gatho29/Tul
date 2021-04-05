import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from './auth.service';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private firestore: AngularFirestore,
    private authservice: AuthService) { }

  createProduct(product) {
    return this.firestore.collection('products').add(product)
  }

  getProducts() {
    return this.firestore.collection('products')
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(s => ({ uid: s.payload.doc.id, ...s.payload.doc.data() as any })))
      )
  }

  getProductsByCart(cartId) {
    const { uid } = this.authservice.user
    return this.firestore.collection(`${uid}/productCarts/items`, ref => ref.where('cartId', '==', cartId)).get();
  }

}
