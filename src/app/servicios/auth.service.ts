import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private adminEmail = 'miguelam20@educastur.es';

  /* comprobar que el usuario está logeado */
  isLogeado(): boolean {
    return this.firebaseAuth.currentUser !== null;
  }

  /* comprobar si el usuario es admin */
  isAdmin(): boolean {
    return this.firebaseAuth.currentUser?.email === this.adminEmail;
  }

  /* metodo para registrarse */
  register(
    email: string,
    nombreUsu: string,
    pass: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      pass
    ).then(async (response) =>
      updateProfile(response.user, { displayName: nombreUsu })
    );

    return from(promise);
  }

  /* para logearse */
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password));
  }

  /* para cerrar sesión */
  logout(): Observable<any> {
    return from(signOut(this.firebaseAuth));
  }

  /* para mostrar el nombre, es para el mensaje de bienvenida */
  getUsuario(): string {
    return this.firebaseAuth.currentUser?.displayName || 'Usuario';
  }

  constructor() {}
}
