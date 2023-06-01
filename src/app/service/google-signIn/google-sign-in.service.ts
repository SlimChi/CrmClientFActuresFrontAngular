import { Injectable } from '@angular/core';

import {Router} from "@angular/router";
import {GoogleAuthProvider} from "firebase/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class GoogleSignInService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // Connexion avec Google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
      // Redirigez l'utilisateur vers une page spécifique après une connexion réussie
      this.router.navigate(['/admin/users']);
      // Enregistrez le jeton d'authentification dans le stockage local ou tout autre traitement nécessaire
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }).catch(err => {
      alert(err.message);
    });
  }
}
