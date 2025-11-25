import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Component for displaying a "Coming Soon" placeholder page.
 */
@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './coming-soon.html',
  styleUrls: ['./coming-soon.css']
})
export class ComingSoonComponent {}
