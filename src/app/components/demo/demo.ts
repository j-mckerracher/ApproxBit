import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  signal,
  viewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface DataPoint {
  label: string;
  x: number;
  y: number;
  color?: string;
}

interface BwData {
  baselines: DataPoint[];
  approxbit: DataPoint[];
}

const DATA: Record<number, BwData> = {
  3: {
    baselines: [
      { label: 'Edge-only',           x: 466.9,  y: 70.8, color: '#666' },
      { label: 'Server-only',         x: 6927.2, y: 70.8, color: '#555' },
      { label: 'H.264 (Low)',         x: 3328.9, y: 69.0, color: '#4A90D9' },
      { label: 'H.264 (High)',        x: 2608.8, y: 66.1, color: '#4A90D9' },
      { label: 'DCVC-FM',             x: 1068.9, y: 69.8, color: '#9B6AE0' },
      { label: 'LimitNet (Low)',      x: 725.5,  y: 64.2, color: '#E8A820' },
      { label: 'LimitNet (High)',     x: 543.4,  y: 62.1, color: '#E8A820' },
      { label: 'DeepCOD (1/128-B8)', x: 399.9,  y: 67.0, color: '#5BA85A' },
      { label: 'DeepCOD (1/32-B16)', x: 787.0,  y: 68.9, color: '#5BA85A' },
    ],
    approxbit: [
      { label: 'AB-64-Enc-B8',      x: 306.9, y: 67.9 },
      { label: 'AB-64-NoEnc-B8',    x: 364.5, y: 69.3 },
      { label: 'AB-128-Enc-B8',     x: 315.3, y: 68.1 },
      { label: 'AB-128-NoEnc-B8',   x: 431.5, y: 69.5 },
      { label: 'AB-64-Enc-B16',     x: 392.8, y: 69.2 },
      { label: 'AB-64-NoEnc-B16',   x: 450.5, y: 69.9 },
      { label: 'AB-128-Enc-B16',    x: 401.2, y: 69.4 },
      { label: 'AB-128-NoEnc-B16',  x: 517.4, y: 70.2 },
    ],
  },
  6: {
    baselines: [
      { label: 'Edge-only',           x: 466.9,  y: 70.8, color: '#666' },
      { label: 'Server-only',         x: 3497.2, y: 70.8, color: '#555' },
      { label: 'H.264 (Low)',         x: 1778.5, y: 69.0, color: '#4A90D9' },
      { label: 'H.264 (High)',        x: 1420.3, y: 66.1, color: '#4A90D9' },
      { label: 'DCVC-FM',             x: 1047.3, y: 69.8, color: '#9B6AE0' },
      { label: 'LimitNet (Low)',      x: 440.8,  y: 64.2, color: '#E8A820' },
      { label: 'LimitNet (High)',     x: 343.1,  y: 62.1, color: '#E8A820' },
      { label: 'DeepCOD (1/128-B8)', x: 349.7,  y: 67.0, color: '#5BA85A' },
      { label: 'DeepCOD (1/32-B16)', x: 586.3,  y: 68.9, color: '#5BA85A' },
    ],
    approxbit: [
      { label: 'AB-64-Enc-B8',      x: 302.7, y: 67.9 },
      { label: 'AB-64-NoEnc-B8',    x: 331.1, y: 69.3 },
      { label: 'AB-128-Enc-B8',     x: 307.0, y: 68.1 },
      { label: 'AB-128-NoEnc-B8',   x: 364.6, y: 69.5 },
      { label: 'AB-64-Enc-B16',     x: 388.6, y: 69.2 },
      { label: 'AB-64-NoEnc-B16',   x: 417.0, y: 69.9 },
      { label: 'AB-128-Enc-B16',    x: 392.8, y: 69.4 },
      { label: 'AB-128-NoEnc-B16',  x: 450.5, y: 70.2 },
    ],
  },
  50: {
    baselines: [
      { label: 'Edge-only',           x: 466.9,  y: 70.8, color: '#666' },
      { label: 'Server-only',         x: 478.7,  y: 70.8, color: '#555' },
      { label: 'H.264 (Low)',         x: 414.2,  y: 69.0, color: '#4A90D9' },
      { label: 'H.264 (High)',        x: 374.4,  y: 66.1, color: '#4A90D9' },
      { label: 'DCVC-FM',             x: 1028.2, y: 69.8, color: '#9B6AE0' },
      { label: 'LimitNet (Low)',      x: 190.3,  y: 64.2, color: '#E8A820' },
      { label: 'LimitNet (High)',     x: 166.8,  y: 62.1, color: '#E8A820' },
      { label: 'DeepCOD (1/128-B8)', x: 305.6,  y: 67.0, color: '#5BA85A' },
      { label: 'DeepCOD (1/32-B16)', x: 409.7,  y: 68.9, color: '#5BA85A' },
    ],
    approxbit: [
      { label: 'AB-64-Enc-B8',      x: 299.0, y: 67.9 },
      { label: 'AB-64-NoEnc-B8',    x: 301.6, y: 69.3 },
      { label: 'AB-128-Enc-B8',     x: 299.6, y: 68.1 },
      { label: 'AB-128-NoEnc-B8',   x: 305.8, y: 69.5 },
      { label: 'AB-64-Enc-B16',     x: 385.0, y: 69.2 },
      { label: 'AB-64-NoEnc-B16',   x: 387.6, y: 69.9 },
      { label: 'AB-128-Enc-B16',    x: 385.5, y: 69.4 },
      { label: 'AB-128-NoEnc-B16',  x: 391.7, y: 70.2 },
    ],
  },
};

@Component({
  selector: 'app-demo',
  templateUrl: './demo.html',
  styleUrl: './demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
})
export class DemoComponent {
  readonly legendItems = [
    { color: '#666',     label: 'Edge-only',   diamond: false },
    { color: '#555',     label: 'Server-only', diamond: false },
    { color: '#4A90D9',  label: 'H.264',       diamond: false },
    { color: '#9B6AE0',  label: 'DCVC-FM',     diamond: false },
    { color: '#E8A820',  label: 'LimitNet',    diamond: false },
    { color: '#5BA85A',  label: 'DeepCOD',     diamond: false },
    { color: '#CFB991',  label: 'ApproxBit',   diamond: true  },
  ];

  readonly bwOptions = [
    { bw: 3,  label: '3 Mbps',  sub: 'Satellite'   },
    { bw: 6,  label: '6 Mbps',  sub: '3G Network'  },
    { bw: 50, label: '50 Mbps', sub: 'Broadband'   },
  ];

  readonly selectedBw = signal<number>(3);

  private chartCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');
  private chart: Chart | null = null;

  constructor() {
    afterNextRender(() => {
      this.chart = new Chart(this.chartCanvas().nativeElement, {
        type: 'scatter',
        data: this.buildChartData(this.selectedBw()),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 600, easing: 'easeInOutQuart' },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: '#1E1E1E',
              borderColor: '#CFB991',
              borderWidth: 1,
              titleColor: '#CFB991',
              bodyColor: '#F0EBE1',
              titleFont: { family: 'DM Mono', size: 11 },
              bodyFont: { family: 'DM Sans', size: 12 },
              callbacks: {
                title: (items) => (items[0].raw as DataPoint).label,
                label: (item) => [
                  `Latency: ${(item.raw as DataPoint).x.toFixed(0)} ms`,
                  `Accuracy: ${(item.raw as DataPoint).y.toFixed(1)}%`,
                ],
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Total Latency (ms)  ←  Faster is better',
                color: '#8A8070',
                font: { family: 'DM Mono', size: 10 },
              },
              ticks: { color: '#8A8070', font: { family: 'DM Mono', size: 10 } },
              grid: { color: '#2A2A2A' },
              min: 100,
            },
            y: {
              title: {
                display: true,
                text: 'Top-1 Accuracy (%)  ↑  Higher is better',
                color: '#8A8070',
                font: { family: 'DM Mono', size: 10 },
              },
              ticks: {
                color: '#8A8070',
                font: { family: 'DM Mono', size: 10 },
                callback: (v) => v + '%',
              },
              grid: { color: '#2A2A2A' },
              min: 60,
              max: 73,
            },
          },
        },
      });
    });
  }

  selectBw(bw: number): void {
    this.selectedBw.set(bw);
    if (this.chart) {
      const newData = this.buildChartData(bw);
      this.chart.data.datasets = newData.datasets;
      this.chart.update('active');
    }
  }

  private buildChartData(bw: number) {
    const d = DATA[bw];
    return {
      datasets: [
        {
          label: 'Baselines',
          data: d.baselines.map((p) => ({ x: p.x, y: p.y, label: p.label })),
          pointBackgroundColor: d.baselines.map((p) => p.color as string),
          pointBorderColor: d.baselines.map((p) => p.color as string),
          pointRadius: 8,
          pointHoverRadius: 11,
          showLine: false,
        },
        {
          label: 'ApproxBit',
          data: d.approxbit.map((p) => ({ x: p.x, y: p.y, label: p.label })),
          pointBackgroundColor: '#CFB991',
          pointBorderColor: '#CFB991',
          pointRadius: 10,
          pointHoverRadius: 13,
          pointStyle: 'rectRot' as const,
          showLine: false,
        },
      ],
    };
  }
}
