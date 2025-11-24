import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, catchError, of, switchMap, tap } from 'rxjs';
import { Report, Metric, ChartData, ReportFilter } from '../domain/model/report';
import { ReportApiEndpoint } from '../infrastructure/report-api-endpoint';
import { DashboardSummaryResponse } from '../infrastructure/report-resource';

/**
 * Dashboard state interface.
 */
export interface DashboardState {
  reports: Report[];
  currentReport: Report | null;
  kpiMetrics: Metric[];
  chartData: ChartData[];
  dashboardSummary: DashboardSummaryResponse | null;
  filter: ReportFilter;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

/**
 * Initial dashboard state.
 */
const initialState: DashboardState = {
  reports: [],
  currentReport: null,
  kpiMetrics: [],
  chartData: [],
  dashboardSummary: null,
  filter: {},
  isLoading: false,
  error: null,
  lastUpdated: null
};

/**
 * Dashboard store for managing analytics state.
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardStore {

  private readonly _state = new BehaviorSubject<DashboardState>(initialState);

  // Public observables
  public readonly state$ = this._state.asObservable();
  public readonly reports$ = this.state$.pipe(map(state => state.reports));
  public readonly currentReport$ = this.state$.pipe(map(state => state.currentReport));
  public readonly kpiMetrics$ = this.state$.pipe(map(state => state.kpiMetrics));
  public readonly chartData$ = this.state$.pipe(map(state => state.chartData));
  public readonly dashboardSummary$ = this.state$.pipe(map(state => state.dashboardSummary));
  public readonly filter$ = this.state$.pipe(map(state => state.filter));
  public readonly isLoading$ = this.state$.pipe(map(state => state.isLoading));
  public readonly error$ = this.state$.pipe(map(state => state.error));
  public readonly lastUpdated$ = this.state$.pipe(map(state => state.lastUpdated));

  constructor(private reportApiEndpoint: ReportApiEndpoint) {}

  /**
   * Gets current state snapshot.
   */
  get state(): DashboardState {
    return this._state.value;
  }

  /**
   * Updates the state.
   */
  private updateState(partial: Partial<DashboardState>): void {
    this._state.next({
      ...this.state,
      ...partial,
      lastUpdated: new Date()
    });
  }

  /**
   * Loads dashboard summary data.
   */
  loadDashboardSummary(): Observable<DashboardSummaryResponse | null> {
    this.updateState({ isLoading: true, error: null });

    return this.reportApiEndpoint.getDashboardSummary().pipe(
      tap(summary => {
        this.updateState({
          dashboardSummary: summary,
          isLoading: false
        });
      }),
      catchError(error => {
        this.updateState({
          error: 'Failed to load dashboard summary',
          isLoading: false
        });
        return of(null);
      })
    );
  }

  /**
   * Loads reports with current filter.
   */
  loadReports(): Observable<Report[]> {
    this.updateState({ isLoading: true, error: null });

    return this.reportApiEndpoint.getReportsWithFilter(this.state.filter).pipe(
      tap(reports => {
        this.updateState({
          reports,
          isLoading: false
        });
      }),
      catchError(error => {
        this.updateState({
          error: 'Failed to load reports',
          isLoading: false
        });
        return of([]);
      })
    );
  }

  /**
   * Loads KPI metrics.
   */
  loadKpiMetrics(): Observable<Metric[]> {
    return this.reportApiEndpoint.getKpiMetrics().pipe(
      tap(metrics => {
        this.updateState({ kpiMetrics: metrics });
      }),
      catchError(error => {
        this.updateState({ error: 'Failed to load KPI metrics' });
        return of([]);
      })
    );
  }

  /**
   * Loads chart data for a specific report.
   */
  loadChartData(reportId: string): Observable<ChartData[]> {
    return this.reportApiEndpoint.getChartData(reportId).pipe(
      tap(chartData => {
        this.updateState({ chartData });
      }),
      catchError(error => {
        this.updateState({ error: 'Failed to load chart data' });
        return of([]);
      })
    );
  }

  /**
   * Sets the current report.
   */
  setCurrentReport(report: Report | null): void {
    this.updateState({ currentReport: report });

    if (report) {
      this.loadChartData(report.reportId).subscribe();
    }
  }

  /**
   * Updates the report filter.
   */
  updateFilter(filter: ReportFilter): void {
    this.updateState({ filter: { ...this.state.filter, ...filter } });
  }

  /**
   * Applies the current filter and reloads data.
   */
  applyFilter(): Observable<Report[]> {
    return this.loadReports();
  }

  /**
   * Clears the current filter.
   */
  clearFilter(): void {
    this.updateState({ filter: {} });
    this.loadReports().subscribe();
  }

  /**
   * Refreshes all dashboard data.
   */
  refreshDashboard(): Observable<any> {
    return combineLatest([
      this.loadDashboardSummary(),
      this.loadReports(),
      this.loadKpiMetrics()
    ]);
  }

  /**
   * Clears any error state.
   */
  clearError(): void {
    this.updateState({ error: null });
  }

  /**
   * Sets loading state.
   */
  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  /**
   * Exports a report.
   */
  exportReport(reportId: string, format: 'pdf' | 'excel' = 'pdf'): Observable<Blob> {
    return this.reportApiEndpoint.exportReport(reportId, format);
  }

  /**
   * Resets the store to initial state.
   */
  reset(): void {
    this._state.next(initialState);
  }
}
