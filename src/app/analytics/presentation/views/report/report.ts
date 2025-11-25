import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})
export class AnalyticComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;
  private destroy$ = new Subject<void>();

  // Test data for export functionality
  private testKpiMetrics = [
    { id: 1, name: "They are not interested", value: 2234, percentage: -16, trend: "down" },
    { id: 2, name: "Connection lost", value: 1242, percentage: -15, trend: "down" },
    { id: 3, name: "Number of buttons clicked", value: 34, percentage: 2, trend: "up" },
    { id: 4, name: "New visits", value: 5274, percentage: 20, trend: "up" },
    { id: 5, name: "New followers", value: 142, percentage: 5, trend: "up" },
    { id: 6, name: "Number of posts clicked", value: 4342, percentage: 16, trend: "up" }
  ];

  private testChartData = [{
    chartType: "bar",
    title: "Licores Populares por Zonas",
    labels: ["Smirnuff", "Juger", "Pisco", "Cerveza", "Vodka"],
    datasets: [
      { label: "July Population", data: [15, 25, 35, 12, 40], backgroundColor: "#3b82f6" },
      { label: "August Population", data: [25, 15, 50, 45, 20], backgroundColor: "#ef4444" }
    ]
  }];

  constructor(private translate: TranslateService) {
    console.log('🚀 AnalyticComponent constructor called');
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    console.log('🚀 AnalyticComponent ngOnInit called');
    console.log('🚀 Component should be visible now');

    // Subscribe to language changes to update chart
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('🌐 Language changed, updating chart...');
        if (this.chart) {
          this.chart.destroy();
        }
        // Wait a bit for the view to update
        setTimeout(() => {
          this.createChart();
        }, 100);
      });
  }

  ngAfterViewInit(): void {
    console.log('🚀 ngAfterViewInit called - Creating chart');
    this.createChart();
  }

  ngOnDestroy(): void {
    console.log('🚀 AnalyticComponent ngOnDestroy called');
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    try {
      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Could not get canvas context');
        this.createFallbackChart();
        return;
      }

      console.log('🚀 Creating chart with data');

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Smirnuff', 'Juger', 'Pisco', 'Cerveza', 'Vodka'],
          datasets: [
            {
              label: this.translate.instant('analytics.chart.july-population'),
              data: [15, 25, 35, 12, 40],
              backgroundColor: '#3b82f6',
              borderColor: '#1d4ed8',
              borderWidth: 1
            },
            {
              label: this.translate.instant('analytics.chart.august-population'),
              data: [25, 15, 50, 45, 20],
              backgroundColor: '#ef4444',
              borderColor: '#dc2626',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: this.translate.instant('analytics.chart.title')
            },
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: this.translate.instant('analytics.chart.zones.title') || 'Tipos de Licores'
              },
              grid: {
                display: false
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: this.translate.instant('analytics.chart.total-population')
              },
              beginAtZero: true,
              grid: {
                color: '#f1f5f9'
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          }
        }
      });

      console.log('🚀 Chart created successfully');
    } catch (error) {
      console.error('🚨 Error creating chart:', error);
      this.createFallbackChart();
    }
  }

  private createFallbackChart(): void {
    console.log('🚀 Creating fallback canvas chart');
    try {
      const canvas = this.chartCanvas.nativeElement;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 800;
      canvas.height = 400;

      // Data
      const julyData = [15, 25, 35, 12, 40];
      const augustData = [25, 15, 50, 45, 20];
      const labels = ['Smirnuff', 'Juger', 'Pisco', 'Cerveza', 'Vodka'];
      const maxValue = Math.max(...julyData, ...augustData);

      // Chart dimensions
      const padding = 60;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;
      const barWidth = chartWidth / (labels.length * 2.5);

      // Clear canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw title
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(this.translate.instant('analytics.chart.title'), canvas.width / 2, 30);

      // Draw bars
      labels.forEach((label, index) => {
        const x = padding + (index * chartWidth / labels.length);
        const julyHeight = (julyData[index] / maxValue) * chartHeight;
        const augustHeight = (augustData[index] / maxValue) * chartHeight;

        // July bar (blue)
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, padding + chartHeight - julyHeight, barWidth * 0.8, julyHeight);

        // August bar (red)
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + barWidth, padding + chartHeight - augustHeight, barWidth * 0.8, augustHeight);

        // Label
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth, canvas.height - 20);

        // Values
        ctx.fillStyle = '#1e293b';
        ctx.font = '10px Arial';
        ctx.fillText(julyData[index].toString(), x + barWidth * 0.4, padding + chartHeight - julyHeight - 5);
        ctx.fillText(augustData[index].toString(), x + barWidth * 1.4, padding + chartHeight - augustHeight - 5);
      });

      // Legend
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(padding, 50, 15, 15);
      ctx.fillStyle = '#1e293b';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(this.translate.instant('analytics.chart.july-population'), padding + 20, 62);

      ctx.fillStyle = '#ef4444';
      ctx.fillRect(padding + 150, 50, 15, 15);
      ctx.fillStyle = '#1e293b';
      ctx.fillText(this.translate.instant('analytics.chart.august-population'), padding + 170, 62);

      console.log('🚀 Fallback chart created successfully');
    } catch (error) {
      console.error('🚨 Error creating fallback chart:', error);
    }
  }

  refreshDashboard(): void {
    console.log('🔄 Refreshing dashboard data...');
    // Add refresh animation to button
    const refreshBtn = document.querySelector('.refresh-btn') as HTMLElement;
    if (refreshBtn) {
      refreshBtn.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        refreshBtn.style.transform = '';
      }, 600);
    }
  }

  exportReport(): void {
    console.log('📊 Exporting report...');
    // Simple export simulation
    const reportData = {
      title: this.translate.instant('analytics.report.title'),
      date: new Date().toISOString(),
      kpis: this.testKpiMetrics,
      chart: this.testChartData
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }
}
