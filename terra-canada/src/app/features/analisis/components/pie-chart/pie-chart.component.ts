import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  
  chartData = {
    labels: ['Equipo - Tarjetas', 'Financieros - C. Bancaria', 'Financieros - Tarjetas'],
    datasets: [
      {
        data: [3100, 2800, 2200],
        backgroundColor: ['#2d7a7a', '#5a9b9b', '#8bb5b5'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2
      }
    ]
  };

  ngOnInit(): void {
    this.initChart();
  }

  private initChart(): void {
    // Chart will be initialized using canvas API
    setTimeout(() => {
      this.drawPieChart();
    }, 100);
  }

  private drawPieChart(): void {
    const canvas = this.chartCanvas?.nativeElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;

    const data = this.chartData.datasets[0].data;
    const total = data.reduce((a, b) => a + b, 0);
    const colors = this.chartData.datasets[0].backgroundColor;

    let currentAngle = -Math.PI / 2;

    // Draw pie slices
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index];
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`$${value}K`, labelX, labelY);

      currentAngle += sliceAngle;
    });
  }

  refreshChart(): void {
    this.drawPieChart();
  }
}
