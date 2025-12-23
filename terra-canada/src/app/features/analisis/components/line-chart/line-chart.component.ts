import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit {
  @Input() chartType: 'comparative' | 'cashflow' = 'comparative';
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chartData = {
    comparative: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: '2024',
          data: [12000, 15000, 13000, 16000, 18000, 20000],
          borderColor: '#2d7a7a',
          backgroundColor: 'rgba(45, 122, 122, 0.1)'
        },
        {
          label: '2023',
          data: [10000, 12000, 11000, 13000, 14000, 15000],
          borderColor: '#8bb5b5',
          backgroundColor: 'rgba(139, 181, 181, 0.1)'
        }
      ]
    },
    cashflow: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Ingresos',
          data: [50000, 52000, 51000, 55000, 58000, 60000],
          borderColor: '#2d7a7a',
          backgroundColor: 'rgba(45, 122, 122, 0.1)'
        },
        {
          label: 'Gastos',
          data: [35000, 38000, 36000, 40000, 42000, 45000],
          borderColor: '#d32f2f',
          backgroundColor: 'rgba(211, 47, 47, 0.1)'
        }
      ]
    }
  };

  ngOnInit(): void {
    this.initChart();
  }

  private initChart(): void {
    setTimeout(() => {
      this.drawLineChart();
    }, 100);
  }

  private drawLineChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) return;

    const data = this.chartType === 'comparative' ? this.chartData.comparative : this.chartData.cashflow;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw lines
    const maxValue = 60000;
    const spacing = chartWidth / (data.labels.length - 1);

    data.datasets.forEach((dataset) => {
      ctx.strokeStyle = dataset.borderColor;
      ctx.lineWidth = 2;
      ctx.beginPath();

      dataset.data.forEach((value, index) => {
        const x = padding + spacing * index;
        const y = height - padding - (value / maxValue) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw points
      ctx.fillStyle = dataset.borderColor;
      dataset.data.forEach((value, index) => {
        const x = padding + spacing * index;
        const y = height - padding - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    });

    // Draw labels
    ctx.fillStyle = '#666666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    data.labels.forEach((label, index) => {
      const x = padding + spacing * index;
      ctx.fillText(label, x, height - padding + 20);
    });

    // Draw Y-axis labels
    ctx.textAlign = 'right';
    ctx.font = '11px Arial';
    for (let i = 0; i <= gridLines; i++) {
      const value = Math.round((maxValue / gridLines) * i);
      const y = height - padding - (chartHeight / gridLines) * i;
      ctx.fillText(`$${value / 1000}K`, padding - 10, y + 4);
    }
  }

  refreshChart(): void {
    this.drawLineChart();
  }

  getTitle(): string {
    return this.chartType === 'comparative' ? 'Comparativa Mensual' : 'Flujo de Caja';
  }
}
