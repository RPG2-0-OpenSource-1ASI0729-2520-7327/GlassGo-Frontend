import { BaseResource, BaseResponse } from './base-response';

/**
 * Report resource structure for API communication.
 */
export interface ReportResource extends BaseResource {
  id: number;
  reportId: string;
  title: string;
  description: string;
  reportType: string;
  generatedAt: string;
  lastUpdated: string;
  isActive: boolean;
}

/**
 * Metric resource structure for API communication.
 */
export interface MetricResource extends BaseResource {
  id: number;
  metricId: string;
  reportId: string;
  name: string;
  value: number;
  unit: string;
  percentage?: number;
  trend: string;
  recordedAt: string;
}

/**
 * Chart data resource structure for API communication.
 */
export interface ChartDataResource extends BaseResource {
  id: number;
  chartId: string;
  reportId: string;
  chartType: string;
  title: string;
  labels: string[];
  datasets: DatasetResource[];
  options?: any;
}

/**
 * Dataset resource structure.
 */
export interface DatasetResource {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

/**
 * Report access log resource structure.
 */
export interface ReportAccessLogResource extends BaseResource {
  logId: string;
  userId: string;
  reportId: string;
  accessedAt: string;
  action: string;
}

/**
 * Analytics response wrapper.
 */
export interface AnalyticsResponse extends BaseResponse {
  reports: ReportResource[];
  metrics: MetricResource[];
  chartData: ChartDataResource[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

/**
 * Dashboard summary response.
 */
export interface DashboardSummaryResponse extends BaseResponse {
  userName: string;
  stats: {
    totalReports: number;
    activeMetrics: number;
    lastUpdated: string;
    systemStatus: string;
  };
  recentReports: ReportResource[];
  topMetrics: MetricResource[];
}
