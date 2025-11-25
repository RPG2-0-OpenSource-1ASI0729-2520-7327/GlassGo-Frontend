import {Injectable} from '@angular/core';
import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {ChartData, ChartType, Dataset, Metric, Report, ReportType, TrendType} from '../domain/model/report';
import {AnalyticsResponse, ChartDataResource, DatasetResource, MetricResource, ReportResource} from './report-resource';

/**
 * Assembler for converting between Report entities and resources.
 */
@Injectable({
  providedIn: 'root'
})
export class ReportAssembler implements BaseAssembler<Report, ReportResource, AnalyticsResponse> {

  /**
   * Converts a report resource to a report entity.
   */
  toEntityFromResource(resource: ReportResource): Report {
    return {
      id: resource.id,
      reportId: resource.reportId,
      title: resource.title,
      description: resource.description,
      reportType: this.mapReportType(resource.reportType),
      generatedAt: new Date(resource.generatedAt),
      lastUpdated: new Date(resource.lastUpdated),
      metrics: [],
      chartData: []
    };
  }

  /**
   * Converts a report entity to a report resource.
   */
  toResourceFromEntity(entity: Report): ReportResource {
    return {
      id: entity.id,
      reportId: entity.reportId,
      title: entity.title,
      description: entity.description,
      reportType: entity.reportType.toString(),
      generatedAt: entity.generatedAt.toISOString(),
      lastUpdated: entity.lastUpdated.toISOString(),
      isActive: true
    };
  }

  /**
   * Converts analytics response to report entities array.
   */
  toEntitiesFromResponse(response: AnalyticsResponse): Report[] {
    return response.reports.map(resource => {
      const report = this.toEntityFromResource(resource);

      // Map metrics
      report.metrics = response.metrics
        .filter(m => m.reportId === resource.reportId)
        .map(m => this.toMetricEntityFromResource(m));

      // Map chart data
      report.chartData = response.chartData
        .filter(c => c.reportId === resource.reportId)
        .map(c => this.toChartDataEntityFromResource(c));

      return report;
    });
  }

  /**
   * Converts metric resource to metric entity.
   */
  toMetricEntityFromResource(resource: MetricResource): Metric {
    return {
      id: resource.id,
      metricId: resource.metricId,
      reportId: resource.reportId,
      name: resource.name,
      value: resource.value,
      unit: resource.unit,
      percentage: resource.percentage,
      trend: this.mapTrendType(resource.trend),
      recordedAt: new Date(resource.recordedAt)
    };
  }

  /**
   * Converts chart data resource to chart data entity.
   */
  toChartDataEntityFromResource(resource: ChartDataResource): ChartData {
    return {
      id: resource.id,
      chartId: resource.chartId,
      reportId: resource.reportId,
      chartType: this.mapChartType(resource.chartType),
      title: resource.title,
      labels: resource.labels,
      datasets: resource.datasets.map(d => this.toDatasetEntityFromResource(d)),
      options: resource.options
    };
  }

  /**
   * Converts dataset resource to dataset entity.
   */
  toDatasetEntityFromResource(resource: DatasetResource): Dataset {
    return {
      label: resource.label,
      data: resource.data,
      backgroundColor: resource.backgroundColor,
      borderColor: resource.borderColor,
      borderWidth: resource.borderWidth
    };
  }

  /**
   * Maps string to ReportType enum.
   */
  private mapReportType(type: string): ReportType {
    switch (type.toLowerCase()) {
      case 'analytics': return ReportType.ANALYTICS;
      case 'performance': return ReportType.PERFORMANCE;
      case 'sales': return ReportType.SALES;
      case 'inventory': return ReportType.INVENTORY;
      case 'customer': return ReportType.CUSTOMER;
      default: return ReportType.ANALYTICS;
    }
  }

  /**
   * Maps string to ChartType enum.
   */
  private mapChartType(type: string): ChartType {
    switch (type.toLowerCase()) {
      case 'bar': return ChartType.BAR;
      case 'line': return ChartType.LINE;
      case 'pie': return ChartType.PIE;
      case 'doughnut': return ChartType.DOUGHNUT;
      case 'radar': return ChartType.RADAR;
      case 'polararea': return ChartType.POLAR_AREA;
      default: return ChartType.BAR;
    }
  }

  /**
   * Maps string to TrendType enum.
   */
  private mapTrendType(trend: string): TrendType {
    switch (trend.toLowerCase()) {
      case 'up': return TrendType.UP;
      case 'down': return TrendType.DOWN;
      case 'stable': return TrendType.STABLE;
      case 'neutral': return TrendType.NEUTRAL;
      default: return TrendType.NEUTRAL;
    }
  }
}
