import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/presentation/components/layout/layout';
import { HomeComponent } from './shared/presentation/views/home/home';
import { ComingSoonComponent } from './shared/presentation/views/coming-soon/coming-soon';
import { CreateOrderComponent } from './service-planning/presentation/view/create-order/create-order';
import { PageNotFoundComponent } from './shared/presentation/views/page-not-found/page-not-found';
import { AdministrationComponent } from './shared/presentation/views/administration/administration';
import { AnalyticComponent } from './analytics/presentation/views/report/report';

export const routes: Routes = [
  { path: '', redirectTo: 'app/home', pathMatch: 'full' },

  {
    path: 'app',
    component: LayoutComponent,
    children: [
       // 🔹 Redirección interna si solo entras a /app
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: 'home', component: HomeComponent, title: 'Home - GlassGo' },
      { path: 'crear-pedido', component: CreateOrderComponent, title: 'Crear Pedido - GlassGo' },
      { path: 'tracking', component: ComingSoonComponent, title: 'Tracking - GlassGo' },
      { path: 'inventario', component: ComingSoonComponent, title: 'Inventario - GlassGo' },
      { path: 'calendar', component: ComingSoonComponent, title: 'Calendario - GlassGo' },
      { path: 'reportes', component: AnalyticComponent, title: 'Reportes - GlassGo' },
      { path: 'historial', component: ComingSoonComponent, title: 'Historial - GlassGo' },
      { path: 'reclamos', component: ComingSoonComponent, title: 'Reclamos - GlassGo' },
      { path: 'administracion', component: AdministrationComponent, title: 'Administracion' }
    ]
  },

  { path: '**', component: PageNotFoundComponent, title: 'Página no encontrada - GlassGo' }
];
