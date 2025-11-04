import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="coming"><h2>🚧 Próximamente</h2><p>Estamos trabajando en esta sección.</p></div>`,
  styles: [`.coming{ text-align:center; padding:40px } .coming h2{ color:#0f62fe }`]
})
export class ComingSoonComponent {}
