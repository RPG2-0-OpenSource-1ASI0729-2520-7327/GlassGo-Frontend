import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Report entity representing a business report.
 */
export interface Report extends BaseEntity {
  reportId: string;
  title: string;
  description: string;
  reportType: ReportType;
  generatedAt: Date;
  lastUpdated: Date;
  metrics: Metric[];
  chartData: ChartData[];
}

/**
 * Metric entity for KPI values.
 */
export interface Metric extends BaseEntity {
  metricId: string;
  reportId: string;
  name: string;
  value: number;
  unit: string;
  percentage?: number;
  trend: TrendType;
  recordedAt: Date;
}

/**
 * Chart data structure for visualizations.
 */
export interface ChartData extends BaseEntity {
  chartId: string;
  reportId: string;
  chartType: ChartType;
  title: string;
  labels: string[];
  datasets: Dataset[];
  options?: ChartOptions;
}

/**
 * Dataset for chart data.
 */
export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
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
  startDate?: Date;
  endDate?: Date;
  reportType?: ReportType;
  metricTypes?: string[];
  zone?: string;
  status?: string;
}

/**
 * Access log for dashboard analytics.
 */
export interface ReportAccessLog extends BaseEntity {
  logId: string;
  userId: string;
  reportId: string;
  accessedAt: Date;
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
