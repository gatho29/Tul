import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  buy(cartId) {
    const { uid } = this.authService.user;
    return this.firestore.doc(`${uid}/carts/items/${cartId}`).update({ status: 'completed' });
  }

  createPendingCart() {
    const { uid } = this.authService.user
    return this.firestore.collection(`${uid}/carts/items`).add({ status: 'pending' });
  }

  getPendingCart() {
    const { uid } = this.authService.user
    return this.firestore.collection(`${uid}/carts/items`, ref => ref.where('status', '==', 'pending')).get();
  }

  addProduct(cartId, productId, qty) {
    const { uid } = this.authService.user
    return this.firestore.collection(`${uid}/productCarts/items`).add({ cartId, productId, qty });
  }

  getOrders() {
    const { uid } = this.authService.user
    return this.firestore.collection(`${uid}/carts/items`, ref => ref.where('status', '==', 'completed')).get();
  }

}
