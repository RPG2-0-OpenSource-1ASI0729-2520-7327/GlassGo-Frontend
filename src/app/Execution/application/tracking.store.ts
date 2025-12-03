import { Injectable, signal, computed } from '@angular/core';
import { TrackingInfo, TrackingStatus } from '../domain/model/tracking-info';
import { TrackingApi } from '../infrastructure/tracking-api';

/**
 * State interface for the tracking store in the Execution bounded context.
 * Defines the structure of the application state for tracking management.
 */
export interface TrackingState {
  /** Array of all tracking information entities. */
  trackings: TrackingInfo[];
  /** Currently selected tracking entity for detailed view. */
  selectedTracking: TrackingInfo | null;
  /** Current search query string for filtering trackings. */
  searchQuery: string;
  /** Indicates if a loading operation is in progress. */
  loading: boolean;
  /** Error message if an operation failed, null otherwise. */
  error: string | null;
}

/**
 * Application service implementing a store pattern for managing tracking state in the Execution bounded context.
 * Provides reactive state management for tracking operations, including loading, searching, and selecting trackings.
 * Acts as the application layer facade for tracking-related use cases.
 */
@Injectable({
  providedIn: 'root'
})
export class TrackingStore {
  private readonly state = signal<TrackingState>({
    trackings: [],
    selectedTracking: null,
    searchQuery: '',
    loading: false,
    error: null
  });

  // Selectores computados
  /** Computed signal providing the current list of trackings. */
  readonly trackings = computed(() => this.state().trackings);
  /** Computed signal providing the currently selected tracking. */
  readonly selectedTracking = computed(() => this.state().selectedTracking);
  /** Computed signal indicating if operations are loading. */
  readonly loading = computed(() => this.state().loading);
  /** Computed signal providing the current error message. */
  readonly error = computed(() => this.state().error);
  /** Computed signal providing the current search query. */
  readonly searchQuery = computed(() => this.state().searchQuery);

  /** Computed signal filtering trackings that are currently in transit. */
  readonly inTransitTrackings = computed(() =>
    this.state().trackings.filter(t => t.status === TrackingStatus.IN_TRANSIT)
  );

  /** Computed signal providing filtered trackings based on the search query. */
  readonly filteredTrackings = computed(() => {
    const query = this.state().searchQuery.toLowerCase().trim();
    if (!query) return this.state().trackings;

    return this.state().trackings.filter(tracking =>
      tracking.trackingNumber.toLowerCase().includes(query) ||
      tracking.destination.toLowerCase().includes(query) ||
      tracking.driverName?.toLowerCase().includes(query)
    );
  });

  /**
   * Constructs the TrackingStore with required dependencies.
   * @param trackingApi The infrastructure service for tracking API operations.
   */
  constructor(private trackingApi: TrackingApi) {}

  // Acciones
  /**
   * Sets the loading state.
   * @param loading True to indicate loading, false otherwise.
   */
  setLoading(loading: boolean): void {
    this.updateState({ loading });
  }

  /**
   * Sets the error message.
   * @param error The error message or null to clear errors.
   */
  setError(error: string | null): void {
    this.updateState({ error });
  }

  /**
   * Sets the search query for filtering trackings.
   * @param query The search query string.
   */
  setSearchQuery(query: string): void {
    this.updateState({ searchQuery: query });
  }

  /**
   * Sets the selected tracking for detailed view.
   * @param tracking The tracking entity to select or null to clear selection.
   */
  setSelectedTracking(tracking: TrackingInfo | null): void {
    this.updateState({ selectedTracking: tracking });
  }

  /**
   * Loads all tracking records from the infrastructure layer.
   * Updates the state with the retrieved trackings or sets an error if failed.
   */
  async loadAllTrackings(): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      this.trackingApi.getAllTrackings().subscribe({
        next: (trackings) => {
          this.updateState({ trackings, loading: false });
        },
        error: (error) => {
          console.error('Error loading trackings:', error);
          this.setError('Error al cargar los seguimientos');
          this.setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error loading trackings:', error);
      this.setError('Error al cargar los seguimientos');
      this.setLoading(false);
    }
  }

  /**
   * Searches for a specific tracking by its tracking number.
   * @param trackingNumber The unique tracking number to search for.
   */
  async searchTrackingByNumber(trackingNumber: string): Promise<void> {
    if (!trackingNumber.trim()) {
      this.setError('Por favor, ingresa un número de seguimiento');
      return;
    }

    this.setLoading(true);
    this.setError(null);

    try {
      this.trackingApi.getTrackingByNumber(trackingNumber).subscribe({
        next: (tracking) => {
          if (tracking) {
            this.setSelectedTracking(tracking);
            this.setError(null);
          } else {
            this.setError('No se encontró información para este número de seguimiento');
          }
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error searching tracking:', error);
          this.setError('Error al buscar el seguimiento');
          this.setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error searching tracking:', error);
      this.setError('Error al buscar el seguimiento');
      this.setLoading(false);
    }
  }

  /**
   * Searches for trackings based on a query string.
   * @param query The search query to filter trackings.
   */
  async searchTrackings(query: string): Promise<void> {
    this.setLoading(true);
    this.setError(null);

    try {
      this.trackingApi.searchTrackings(query).subscribe({
        next: (trackings) => {
          this.updateState({ trackings, loading: false });
        },
        error: (error) => {
          console.error('Error searching trackings:', error);
          this.setError('Error al buscar seguimientos');
          this.setLoading(false);
        }
      });
    } catch (error) {
      console.error('Error searching trackings:', error);
      this.setError('Error al buscar seguimientos');
      this.setLoading(false);
    }
  }

  /** Clears the selected tracking and any associated errors. */
  clearSelectedTracking(): void {
    this.setSelectedTracking(null);
    this.setError(null);
  }

  /** Clears any current error message. */
  clearError(): void {
    this.setError(null);
  }

  /**
   * Updates the state with partial changes.
   * @param partial Partial state object to merge with current state.
   */
  private updateState(partial: Partial<TrackingState>): void {
    this.state.update(current => ({ ...current, ...partial }));
  }
}
