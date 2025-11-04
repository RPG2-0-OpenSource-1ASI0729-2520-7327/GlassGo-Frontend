import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/presentation/components/layout/layout';
import { HomeComponent } from './shared/presentation/views/home/home';
import { ComingSoonComponent } from './shared/presentation/views/coming-soon/coming-soon';
import { PageNotFoundComponent } from './shared/presentation/views/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'app/home', pathMatch: 'full' },

  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home - GlassGo' },
      { path: 'crear-pedido', component: ComingSoonComponent, title: 'Crear Pedido - GlassGo' },
      { path: 'tracking', component: ComingSoonComponent, title: 'Tracking - GlassGo' },
      { path: 'inventario', component: ComingSoonComponent, title: 'Inventario - GlassGo' },
      { path: 'reportes', component: ComingSoonComponent, title: 'Reportes - GlassGo' },
      { path: 'calendar', component: ComingSoonComponent, title: 'Calendario - GlassGo' },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  { path: '**', component: PageNotFoundComponent, title: 'Página no encontrada - GlassGo' }
];
