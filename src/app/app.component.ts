import { Component} from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './servicios/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Pandora-panaderia';
  constructor(public authService: AuthService, private router: Router) {}

  /* método para cerrar sesion y routerlink a catalogo */
  logout() {
    this.authService.logout().subscribe(() => this.router.navigate(['/catalogo']));
  }
}
