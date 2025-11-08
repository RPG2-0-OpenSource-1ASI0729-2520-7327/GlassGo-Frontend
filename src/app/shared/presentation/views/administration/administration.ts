import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './administration.html',
  styleUrls: ['./administration.css']
})
export class AdministrationComponent implements OnInit {
  distribuidoras: any[] = [];
  licorerias: any[] = [];

  constructor(private http: HttpClient) {}

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
