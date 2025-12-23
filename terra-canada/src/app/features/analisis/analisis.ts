import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { TopHeaderComponent } from '../../shared/components/top-header/top-header';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { HeatmapChartComponent } from './components/heatmap-chart/heatmap-chart.component';
import { FunnelChartComponent } from './components/funnel-chart/funnel-chart.component';
import { StatCard } from '../../shared/models/dashboard.model';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-analisis',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopHeaderComponent,
    StatCardComponent,
    PieChartComponent,
    BarChartComponent,
    LineChartComponent,
    HeatmapChartComponent,
    FunnelChartComponent,
    TranslatePipe
  ],
  templateUrl: './analisis.html',
  styleUrl: './analisis.scss'
})
export class AnalisisComponent implements OnInit {
  stats: StatCard[] = [];

  ngOnInit(): void {
    this.initializeStats();
  }

  private initializeStats(): void {
    this.stats = [
      {
        id: 'ingresos-totales',
        title: 'Ingresos Totales',
        value: 125678,
        icon: 'pi pi-dollar',
        color: '#2d7a7a',
        trend: 12.5,
        trendDirection: 'up',
        unit: '$'
      },
      {
        id: 'transacciones',
        title: 'Transacciones',
        value: 1234,
        icon: 'pi pi-shopping-cart',
        color: '#2d7a7a',
        trend: 8.3,
        trendDirection: 'up'
      },
      {
        id: 'ticket-promedio',
        title: 'Ticket Promedio',
        value: 102,
        icon: 'pi pi-tag',
        color: '#2d7a7a',
        trend: -2.1,
        trendDirection: 'down',
        unit: '$'
      },
      {
        id: 'tasa-conversion',
        title: 'Tasa Conversión',
        value: 78,
        icon: 'pi pi-chart-line',
        color: '#2d7a7a',
        trend: 5.2,
        trendDirection: 'up',
        unit: '%'
      }
    ];
  }

  exportExcel(): void {
    console.log('Exporting to Excel...');
    // Implementar exportación a Excel
  }

  exportCSV(): void {
    console.log('Exporting to CSV...');
    // Implementar exportación a CSV
  }

  exportPDF(): void {
    console.log('Generating PDF report...');
    // Implementar generación de PDF
  }

  exportJSON(): void {
    console.log('Exporting to JSON...');
    // Implementar exportación a JSON
  }
}
