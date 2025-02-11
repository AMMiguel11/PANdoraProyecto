import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  email = '';
  nombreUsu = '';
  pass = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  /* para que queden mejor los error code*/
  getError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Ya existe una cuenta con ese Email';
      case 'auth/invalid-email':
        return 'Email no válido';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil';
      default:
        return 'Error en el registro';
    }
  }

  /* resgistro con validación de errores, lleva al catálogo */
  onRegister() {
    if (this.email && this.nombreUsu && this.pass) {
      this.authService
        .register(this.email, this.nombreUsu, this.pass)
        .subscribe({
          next: () => {
            this.router.navigate(['/catalogo']);
          },
          error: (error) => {
            this.error = error.code;
          },
        });
    } else {
      this.error = 'Por favor, completa todos los campos';
    }
  }
}
