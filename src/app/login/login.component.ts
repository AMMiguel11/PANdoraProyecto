import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  pass = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  /* para que queden mejor los error code*/
  getError(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'Email no válido';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      default:
        return 'Error al iniciar sesión';
    }
  }

  /* login con validación, te lleva al catálogo */
  onLogin() {
    if (this.email && this.pass) {
      this.authService.login(this.email, this.pass).subscribe({
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
