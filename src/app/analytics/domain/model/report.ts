import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Report entity representing a business report.
 */
export interface Report extends BaseEntity {
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
   * Type of the report.
   */
  reportType: ReportType;
  /**
   * Date when the report was generated.
   */
  generatedAt: Date;
  /**
   * Date when the report was last updated.
   */
  lastUpdated: Date;
  /**
   * Array of metrics associated with the report.
   */
  metrics: Metric[];
  /**
   * Array of chart data associated with the report.
   */
  chartData: ChartData[];
}

/**
 * Metric entity for KPI values.
 */
export interface Metric extends BaseEntity {
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
   * Trend direction of the metric.
   */
  trend: TrendType;
  /**
   * Date when the metric was recorded.
   */
  recordedAt: Date;
}

/**
 * Chart data structure for visualizations.
 */
export interface ChartData extends BaseEntity {
  /**
   * Unique identifier for the chart.
   */
  chartId: string;
  /**
   * Identifier of the associated report.
   */
  reportId: string;
  /**
   * Type of the chart.
   */
  chartType: ChartType;
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
  datasets: Dataset[];
  /**
   * Optional configuration options for the chart.
   */
  options?: ChartOptions;
}

/**
 * Dataset for chart data.
 */
export interface Dataset {
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
 * Chart configuration options.
 */
export interface ChartOptions {
  responsive: boolean;
  maintainAspectRatio: boolean;
  plugins?: {
    legend?: {
      display: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip?: {
      enabled: boolean;
    };
  };
  scales?: {
    x?: {
      display: boolean;
    };
    y?: {
      display: boolean;
      beginAtZero?: boolean;
    };
  };
}

/**
 * Report filter for data queries.
 */
export interface ReportFilter {
  /**
   * Optional start date for filtering reports.
   */
  startDate?: Date;
  /**
   * Optional end date for filtering reports.
   */
  endDate?: Date;
  /**
   * Optional report type filter.
   */
  reportType?: ReportType;
  /**
   * Optional array of metric types to filter.
   */
  metricTypes?: string[];
  /**
   * Optional zone filter.
   */
  zone?: string;
  /**
   * Optional status filter.
   */
  status?: string;
}

/**
 * Access log for dashboard analytics.
 */
export interface ReportAccessLog extends BaseEntity {
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
   * Date and time when the access occurred.
   */
  accessedAt: Date;
  /**
   * Action performed during the access.
   */
  action: AccessAction;
}

/**
 * Types of reports available.
 */
export enum ReportType {
  ANALYTICS = 'analytics',
  PERFORMANCE = 'performance',
  SALES = 'sales',
  INVENTORY = 'inventory',
  CUSTOMER = 'customer'
}

/**
 * Types of charts supported.
 */
export enum ChartType {
  BAR = 'bar',
  LINE = 'line',
  PIE = 'pie',
  DOUGHNUT = 'doughnut',
  RADAR = 'radar',
  POLAR_AREA = 'polarArea'
}

/**
 * Trend indicators for metrics.
 */
export enum TrendType {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  NEUTRAL = 'neutral'
}

/**
 * Access actions for logging.
 */
export enum AccessAction {
  VIEW = 'view',
  EXPORT = 'export',
  FILTER = 'filter',
  REFRESH = 'refresh'
}
