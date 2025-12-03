import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Report, ReportFilter } from '../domain/model/report';
import { ReportResource, AnalyticsResponse, DashboardSummaryResponse } from './report-resource';
import { ReportAssembler } from './report-assembler';

/**
 * API endpoint for reports and analytics data.
 */
@Injectable({
  providedIn: 'root'
})
export class ReportApiEndpoint {

  private readonly apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private assembler: ReportAssembler
  ) {}

  /**
   * Gets dashboard summary data.
   */
  getDashboardSummary(): Observable<DashboardSummaryResponse> {
    return this.http.get<any>(`${this.apiUrl}/analytics?type=dashboard`).pipe(
      map(response => {
        const dashboard = response[0]; // Get first dashboard entry
        return {
          userName: dashboard.userName,
          stats: dashboard.stats,
          recentReports: [],
          topMetrics: []
        } as DashboardSummaryResponse;
      })
    );
  }

  /**
   * Gets reports with optional filters.
   */
  getReportsWithFilter(filter?: ReportFilter): Observable<Report[]> {
    return this.http.get<ReportResource[]>(`${this.apiUrl}/reports`).pipe(
      map(response => response.map(resource => this.assembler.toEntityFromResource(resource)))
    );
  }

  /**
   * Gets chart data for a specific report.
   */
  getChartData(reportId: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/chartData?reportId=${reportId}`);
  }

  /**
   * Gets KPI metrics for dashboard.
   */
  getKpiMetrics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/kpis`);
  }

  /**
   * Exports report data.
   */
  exportReport(reportId: string, format: 'pdf' | 'excel' = 'pdf'): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reports/${reportId}/export?format=${format}`, {
      responseType: 'blob'
    });
  }
}
