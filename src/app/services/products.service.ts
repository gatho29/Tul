import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }
  createProduct(product){
    return this.firestore.collection('products').add(product)
  }

  getProducts(){
    return this.firestore.collection('products')
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(s => ({ uid: s.payload.doc.id, ...s.payload.doc.data() as any })))
      )
  }

}
