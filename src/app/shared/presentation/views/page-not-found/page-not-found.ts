import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';

/**
 * Component for displaying a 404 page not found error.
 */
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="text-align:center;padding:40px">
               <h1>404 - Página no encontrada</h1>
               <button (click)="goHome()">Volver al inicio</button>
             </div>`,
  styles: [`button{ margin-top:12px; padding:8px 14px; border-radius:6px; background:#0f62fe; color:#fff; border:none}`]
})
export class PageNotFoundComponent {
  /**
   * Constructor for PageNotFoundComponent.
   * @param router - The Angular Router instance.
   */
  constructor(private router: Router) {}

  /**
   * Navigates back to the home page.
   */
  goHome() { this.router.navigate(['/app/home']); }
}
