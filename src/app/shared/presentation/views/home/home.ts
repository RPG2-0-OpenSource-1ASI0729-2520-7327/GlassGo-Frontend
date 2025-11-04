import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  userName = 'Usuario';
  stats: any = {};
  recentTracking: any[] = [];
  inventory: any[] = [];
  calendar: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/db.json').subscribe(data => {
      this.stats = data.stats;
      this.recentTracking = data.recentTracking;
      this.inventory = data.inventory;
      this.calendar = data.calendar;
      this.userName = data.userName;
    });
  }
}
