import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

// Components
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/**
 * Main layout component that provides the application structure.
 * Includes navigation, breadcrumbs, and common UI elements.
 */
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {
  appTitle = 'GlassGo';
  currentRoute = '';

  /**
   * Creates an instance of LayoutComponent.
   * @param router - Angular Router service for navigation.
   */
  constructor(private router: Router) {
    // Detectar ruta actual y mostrar nombre en breadcrumb
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      const path = event.urlAfterRedirects.replace('/', '');
      this.currentRoute = this.mapRouteToName(path);
    });
  }

  /**
   * Maps a route path to a human-readable name for breadcrumbs.
   * @param path - The route path.
   * @returns The display name for the route.
   */
  mapRouteToName(path: string): string {
    if (path.includes('home')) return 'Inicio';
    if (path.includes('crear-pedido')) return 'Crear Pedido';
    if (path.includes('tracking')) return 'Tracking';
    if (path.includes('inventario')) return 'Inventario';
    if (path.includes('calendar')) return 'Calendario';
    if (path.includes('reportes')) return 'Reportes';
    if (path.includes('historial')) return 'Historial';
    if (path.includes('reclamos')) return 'Reclamos';
    return 'Página no encontrada';
  }

  /**
   * Handles user logout.
   */
  logout() {
    alert('Sesión cerrada');
    this.router.navigate(['/home']);
  }
}
