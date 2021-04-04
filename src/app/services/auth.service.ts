import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login({email, password}): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signUp({ name, email, password }) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }
}
