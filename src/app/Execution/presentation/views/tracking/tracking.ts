import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackingStore } from '../../../application/tracking.store';
import { TrackingInfo, TrackingStatus } from '../../../domain/model/tracking-info';
import { TrackingMapComponent } from '../../components/tracking-map/tracking-map';

/**
 * Presentation view component for tracking management in the Execution bounded context.
 * Provides the user interface for searching, viewing, and interacting with shipment tracking information.
 * Acts as the main view for the tracking feature, coordinating with the application layer store.
 */
@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, TrackingMapComponent],
  templateUrl: './tracking.html',
  styleUrls: ['./tracking.css']
})
export class TrackingComponent implements OnInit {
  /** The current search query entered by the user. */
  searchQuery = '';

  /**
   * Constructs the TrackingComponent with required dependencies.
   * @param trackingStore The application store for tracking state management.
   */
  constructor(private trackingStore: TrackingStore) {}

  // Computed signals del store como getters
  /** Gets the list of all trackings from the store. */
  get trackings() {
    return this.trackingStore.trackings;
  }

  /** Gets the currently selected tracking from the store. */
  get selectedTracking() {
    return this.trackingStore.selectedTracking;
  }

  /** Gets the loading state from the store. */
  get loading() {
    return this.trackingStore.loading;
  }

  /** Gets the current error message from the store. */
  get error() {
    return this.trackingStore.error;
  }

  /** Gets the list of trackings that are currently in transit. */
  get inTransitTrackings() {
    return this.trackingStore.inTransitTrackings;
  }

  /**
   * Initializes the component and loads initial tracking data.
   */
  ngOnInit(): void {
    // Cargar seguimientos iniciales
    this.trackingStore.loadAllTrackings();
  }

  /**
   * Searches for a tracking by its tracking number using the current search query.
   */
  searchTracking(): void {
    if (this.searchQuery.trim()) {
      this.trackingStore.searchTrackingByNumber(this.searchQuery.trim());
    }
  }

  /**
   * Selects a tracking for detailed view.
   * @param tracking The tracking entity to select.
   */
  selectTracking(tracking: TrackingInfo): void {
    this.trackingStore.setSelectedTracking(tracking);
  }

  /**
   * Converts a tracking status enum to a localized display text.
   * @param status The tracking status enum value.
   * @returns The localized status text.
   */
  getStatusText(status: TrackingStatus): string {
    const statusMap = {
      [TrackingStatus.PENDING]: 'Pendiente',
      [TrackingStatus.IN_TRANSIT]: 'En Tránsito',
      [TrackingStatus.DELIVERED]: 'Entregado',
      [TrackingStatus.DELAYED]: 'Retrasado',
      [TrackingStatus.CANCELLED]: 'Cancelado'
    };
    return statusMap[status] || 'Desconocido';
  }

  /**
   * Formats a date object to a localized date and time string.
   * @param date The date to format.
   * @returns The formatted date and time string.
   */
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
