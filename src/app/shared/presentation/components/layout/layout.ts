import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent {
  appTitle = 'GlassGo';
  currentRoute = '';

  constructor(private router: Router) {
    // Detectar ruta actual y mostrar nombre en breadcrumb
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      const path = event.urlAfterRedirects.replace('/', '');
      this.currentRoute = this.mapRouteToName(path);
    });
  }

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

  logout() {
    alert('Sesión cerrada');
    this.router.navigate(['/home']);
  }
}
