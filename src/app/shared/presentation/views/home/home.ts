import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Home component displaying dashboard overview with stats, tracking, inventory, and calendar data.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  userName = 'Usuario';
  stats: any = {};
  recentTracking: any[] = [];
  inventory: any[] = [];
  calendar: any[] = [];

  /**
   * Creates an instance of HomeComponent.
   * @param http - HTTP client for loading data.
   */
  constructor(private http: HttpClient) {}

  /**
   * Initializes the component and loads dashboard data.
   */
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
