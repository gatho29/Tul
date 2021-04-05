import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user;
  userSubscription = new Subscription();
  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore) { }

  login({ email, password }): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signUp({ name, email, password }) {
    return new Promise<any>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
        this.firestore.doc(`${user.uid}/user`).set({
          uid: user.uid,
          name,
          email
        }).then(() => {
          resolve(user)
        }).catch((error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error)
      })
    })
  }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/user`).valueChanges()
          .subscribe((user) => {
            this._user = user;
          })
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
      }
    })
  }
  get user() {
    return { ...this._user };
  }

  logout() {
    return this.auth.signOut();
  }
}
