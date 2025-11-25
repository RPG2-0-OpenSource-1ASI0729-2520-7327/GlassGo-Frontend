import {BaseResource, BaseResponse} from './base-response';

/**
 * Report resource structure for API communication.
 */
export interface ReportResource extends BaseResource {
  /**
   * Unique identifier for the report.
   */
  id: number;
  /**
   * Unique identifier for the report.
   */
  reportId: string;
  /**
   * Title of the report.
   */
  title: string;
  /**
   * Description of the report.
   */
  description: string;
  /**
   * Type of the report as a string.
   */
  reportType: string;
  /**
   * Date when the report was generated as a string.
   */
  generatedAt: string;
  /**
   * Date when the report was last updated as a string.
   */
  lastUpdated: string;
  /**
   * Whether the report is active.
   */
  isActive: boolean;
}

/**
 * Metric resource structure for API communication.
 */
export interface MetricResource extends BaseResource {
  /**
   * Unique identifier for the metric.
   */
  id: number;
  /**
   * Unique identifier for the metric.
   */
  metricId: string;
  /**
   * Identifier of the associated report.
   */
  reportId: string;
  /**
   * Name of the metric.
   */
  name: string;
  /**
   * Numerical value of the metric.
   */
  value: number;
  /**
   * Unit of measurement for the metric.
   */
  unit: string;
  /**
   * Optional percentage change for the metric.
   */
  percentage?: number;
  /**
   * Trend direction as a string.
   */
  trend: string;
  /**
   * Date when the metric was recorded as a string.
   */
  recordedAt: string;
}

/**
 * Chart data resource structure for API communication.
 */
export interface ChartDataResource extends BaseResource {
  /**
   * Unique identifier for the chart.
   */
  id: number;
  /**
   * Unique identifier for the chart.
   */
  chartId: string;
  /**
   * Identifier of the associated report.
   */
  reportId: string;
  /**
   * Type of the chart as a string.
   */
  chartType: string;
  /**
   * Title of the chart.
   */
  title: string;
  /**
   * Array of labels for the chart.
   */
  labels: string[];
  /**
   * Array of datasets for the chart.
   */
  datasets: DatasetResource[];
  /**
   * Optional configuration options for the chart.
   */
  options?: any;
}

/**
 * Dataset resource structure.
 */
export interface DatasetResource {
  /**
   * Label for the dataset.
   */
  label: string;
  /**
   * Array of numerical data points.
   */
  data: number[];
  /**
   * Optional background color(s) for the dataset.
   */
  backgroundColor?: string | string[];
  /**
   * Optional border color(s) for the dataset.
   */
  borderColor?: string | string[];
  /**
   * Optional border width for the dataset.
   */
  borderWidth?: number;
}

/**
 * Report access log resource structure.
 */
export interface ReportAccessLogResource extends BaseResource {
  /**
   * Unique identifier for the access log.
   */
  logId: string;
  /**
   * Identifier of the user who accessed the report.
   */
  userId: string;
  /**
   * Identifier of the accessed report.
   */
  reportId: string;
  /**
   * Date and time when the access occurred as a string.
   */
  accessedAt: string;
  /**
   * Action performed during the access as a string.
   */
  action: string;
}

/**
 * Analytics response wrapper.
 */
export interface AnalyticsResponse extends BaseResponse {
  /**
   * Array of report resources.
   */
  reports: ReportResource[];
  /**
   * Array of metric resources.
   */
  metrics: MetricResource[];
  /**
   * Array of chart data resources.
   */
  chartData: ChartDataResource[];
  /**
   * Total count of items.
   */
  totalCount: number;
  /**
   * Current page number.
   */
  currentPage: number;
  /**
   * Total number of pages.
   */
  totalPages: number;
}

/**
 * Dashboard summary response.
 */
export interface DashboardSummaryResponse extends BaseResponse {
  /**
   * Name of the user.
   */
  userName: string;
  /**
   * Statistics object containing dashboard metrics.
   */
  stats: {
    /**
     * Total number of reports.
     */
    totalReports: number;
    /**
     * Number of active metrics.
     */
    activeMetrics: number;
    /**
     * Last updated timestamp as a string.
     */
    lastUpdated: string;
    /**
     * Current system status.
     */
    systemStatus: string;
  };
  /**
   * Array of recent report resources.
   */
  recentReports: ReportResource[];
  /**
   * Array of top metric resources.
   */
  topMetrics: MetricResource[];
}
