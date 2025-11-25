import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';

/**
 * Component for displaying administration data including distributors and liquor stores.
 */
@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './administration.html',
  styleUrls: ['./administration.css']
})
export class AdministrationComponent implements OnInit {
  /**
   * Array of distributor clients.
   */
  distribuidoras: any[] = [];

  /**
   * Array of liquor store clients.
   */
  licorerias: any[] = [];

  /**
   * Constructor for AdministrationComponent.
   * @param http - The HttpClient instance for API calls.
   */
  constructor(private http: HttpClient) {}

  /**
   * Lifecycle hook called after component initialization. Loads client data.
   */
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/clientes').subscribe({
      next: (data) => {
        this.distribuidoras = data.filter(c => c.tipo === 'distribuidora');
        this.licorerias = data.filter(c => c.tipo === 'licoreria');
      },
      error: (err) => console.error('Error al cargar clientes:', err)
    });
  }
}
