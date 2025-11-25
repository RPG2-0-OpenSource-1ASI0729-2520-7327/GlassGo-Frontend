import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Component for displaying the application footer content.
 */
@Component({
  selector: 'app-footer-content',
  imports: [TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css'
})
export class FooterContent {

}
