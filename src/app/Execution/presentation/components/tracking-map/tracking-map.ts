import { Component, ElementRef, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { TrackingInfo } from '../../../domain/model/tracking-info';
import { Coordinate, RoutePoint } from '../../../domain/model/coordinate';

/**
 * Presentation component for displaying tracking information on an interactive map in the Execution bounded context.
 * Renders the delivery route, checkpoints, and current location using Leaflet maps.
 * Provides visual representation of shipment tracking data for user interaction.
 */
@Component({
  selector: 'app-tracking-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #mapContainer class="map-container" [style.height.px]="height"></div>
  `,
  styles: [`
    .map-container {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class TrackingMapComponent implements OnInit, OnDestroy, OnChanges {
  /** The tracking information to display on the map. */
  @Input() tracking: TrackingInfo | null = null;
  /** The height of the map container in pixels. */
  @Input() height: number = 500;
  /** Reference to the map container DOM element. */
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  private map: L.Map | null = null;
  private routePolyline: L.Polyline | null = null;
  private markers: L.Marker[] = [];

  /**
   * Initializes the component and sets up the map.
   */
  ngOnInit(): void {
    this.initializeMap();
  }

  /**
   * Cleans up the map instance when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  /**
   * Responds to changes in input properties, updating the map data when tracking changes.
   * @param changes The changes detected in input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tracking'] && this.map) {
      this.updateMapData();
    }
  }

  /**
   * Initializes the Leaflet map with default settings and tile layer.
   */
  private initializeMap(): void {
    // Configurar iconos de Leaflet
    this.setupLeafletIcons();

    // Coordenadas por defecto (Lima, Perú)
    const defaultCenter: [number, number] = [-12.0464, -77.0428];

    this.map = L.map(this.mapContainer.nativeElement).setView(defaultCenter, 12);

    // Agregar tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);

    // Actualizar datos si hay tracking
    if (this.tracking) {
      this.updateMapData();
    }
  }

  /**
   * Configures Leaflet marker icons to work properly in Angular applications.
   */
  private setupLeafletIcons(): void {
    // Fix para iconos de Leaflet en aplicaciones de Angular
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';

    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = iconDefault;
  }

  /**
   * Updates the map with new tracking data, drawing routes and markers.
   */
  private updateMapData(): void {
    if (!this.map || !this.tracking) return;

    // Limpiar datos anteriores
    this.clearMapData();

    const route = this.tracking.route;
    if (route.length === 0) return;

    // Crear coordenadas para la polilínea
    const coordinates: [number, number][] = route.map(point => [
      point.coordinate.lat,
      point.coordinate.lng
    ]);

    // Agregar la ruta como polilínea
    this.routePolyline = L.polyline(coordinates, {
      color: '#3b82f6',
      weight: 4,
      opacity: 0.8
    }).addTo(this.map);

    // Agregar marcadores para cada punto
    route.forEach((point, index) => {
      const marker = this.createRouteMarker(point, index, route.length);
      this.markers.push(marker);
      marker.addTo(this.map!);
    });

    // Agregar marcador de posición actual
    const currentMarker = this.createCurrentLocationMarker(this.tracking.currentLocation);
    this.markers.push(currentMarker);
    currentMarker.addTo(this.map);

    // Ajustar la vista para mostrar toda la ruta
    this.map.fitBounds(this.routePolyline.getBounds(), { padding: [20, 20] });
  }

  /**
   * Creates a marker for a route point with appropriate styling and popup.
   * @param point The route point to create a marker for.
   * @param index The index of the point in the route.
   * @param total The total number of points in the route.
   * @returns The created Leaflet marker.
   */
  private createRouteMarker(point: RoutePoint, index: number, total: number): L.Marker {
    const isFirst = index === 0;
    const isLast = index === total - 1;

    let iconColor = '#6b7280'; // Default gray
    let iconHtml = `<div style="
      background-color: ${iconColor};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`;

    if (isFirst) {
      iconColor = '#10b981'; // Green for start
      iconHtml = `<div style="
        background-color: ${iconColor};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">S</div>`;
    } else if (isLast) {
      iconColor = '#ef4444'; // Red for end
      iconHtml = `<div style="
        background-color: ${iconColor};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">E</div>`;
    }

    const customIcon = L.divIcon({
      html: iconHtml,
      className: 'custom-route-marker',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    const marker = L.marker([point.coordinate.lat, point.coordinate.lng], {
      icon: customIcon
    });

    const popupContent = `
      <div style="min-width: 200px;">
        <h4 style="margin: 0 0 8px 0; color: #374151; font-size: 14px;">
          ${isFirst ? '🟢 Punto de Origen' : isLast ? '🔴 Destino' : `📍 Checkpoint ${index}`}
        </h4>
        <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 12px;">
          <strong>Hora:</strong> ${this.formatTime(point.timestamp)}
        </p>
        ${point.description ? `<p style="margin: 0; color: #6b7280; font-size: 12px;">
          <strong>Descripción:</strong> ${point.description}
        </p>` : ''}
      </div>
    `;

    marker.bindPopup(popupContent);

    return marker;
  }

  /**
   * Creates a marker for the current location of the shipment.
   * @param location The current coordinate of the shipment.
   * @returns The created Leaflet marker for current location.
   */
  private createCurrentLocationMarker(location: Coordinate): L.Marker {
    const iconHtml = `
      <div style="position: relative;">
        <div style="
          background-color: #3b82f6;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 3px 6px rgba(0,0,0,0.4);
          animation: pulse 2s infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        ">📍</div>
        <style>
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            }
          }
        </style>
      </div>
    `;

    const currentIcon = L.divIcon({
      html: iconHtml,
      className: 'current-location-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const marker = L.marker([location.lat, location.lng], {
      icon: currentIcon
    });

    marker.bindPopup(`
      <div style="min-width: 150px; text-align: center;">
        <h4 style="margin: 0 0 8px 0; color: #3b82f6; font-size: 14px;">
          📍 Ubicación Actual
        </h4>
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          Lat: ${location.lat.toFixed(4)}<br>
          Lng: ${location.lng.toFixed(4)}
        </p>
      </div>
    `);

    return marker;
  }

  /**
   * Clears all map data including polylines and markers.
   */
  private clearMapData(): void {
    // Remover polilínea anterior
    if (this.routePolyline) {
      this.routePolyline.remove();
      this.routePolyline = null;
    }

    // Remover marcadores anteriores
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
  }

  /**
   * Formats a date object to a localized time string.
   * @param date The date to format.
   * @returns The formatted time string.
   */
  private formatTime(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }).format(date);
  }
}
