import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Component for displaying the home dashboard with statistics and recent data.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  /**
   * The name of the user.
   */
  userName = 'Usuario';

  /**
   * Statistics data for the dashboard.
   */
  stats: any = {};

  /**
   * Array of recent tracking data.
   */
  recentTracking: any[] = [];

  /**
   * Array of inventory data.
   */
  inventory: any[] = [];

  /**
   * Array of calendar events.
   */
  calendar: any[] = [];

  /**
   * Constructor for HomeComponent.
   * @param http - The HttpClient instance for API calls.
   */
  constructor(private http: HttpClient) {}

  /**
   * Lifecycle hook called after component initialization. Loads dashboard data.
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
