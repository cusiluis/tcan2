import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Equipo - Tarjetas',
        data: [2500, 3200, 2800, 3500, 4000, 3800],
        backgroundColor: '#2d7a7a'
      },
      {
        label: 'Financieros - C. Bancaria',
        data: [2000, 2800, 3200, 2900, 3500, 3200],
        backgroundColor: '#5a9b9b'
      }
    ]
  };

  ngOnInit(): void {
    this.initChart();
  }

  private initChart(): void {
    setTimeout(() => {
      this.drawBarChart();
    }, 100);
  }

  private drawBarChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Draw background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
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

    // Draw bars
    const barWidth = chartWidth / (this.chartData.labels.length * 2.5);
    const spacing = chartWidth / this.chartData.labels.length;
    const maxValue = 4500;

    this.chartData.labels.forEach((label, index) => {
      const x = padding + spacing * index + spacing / 4;

      // Draw bars for each dataset
      this.chartData.datasets.forEach((dataset, datasetIndex) => {
        const value = dataset.data[index];
        const barHeight = (value / maxValue) * chartHeight;
        const barX = x + datasetIndex * barWidth;
        const barY = height - padding - barHeight;

        ctx.fillStyle = dataset.backgroundColor;
        ctx.fillRect(barX, barY, barWidth - 2, barHeight);
      });

      // Draw label
      ctx.fillStyle = '#666666';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(label, x + barWidth, height - padding + 20);
    });

    // Draw Y-axis labels
    ctx.fillStyle = '#666666';
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= gridLines; i++) {
      const value = Math.round((maxValue / gridLines) * i);
      const y = height - padding - (chartHeight / gridLines) * i;
      ctx.fillText(`$${value}`, padding - 10, y + 4);
    }
  }

  refreshChart(): void {
    this.drawBarChart();
  }
}
