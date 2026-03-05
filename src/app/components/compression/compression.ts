import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

const compressData = [
  { method: 'DNN Surgery\n(No compression)', size: 4000, sizeLabel: '~4MB', acc: '70.8%', color: '#444' },
  { method: 'Server-only\n(Raw video)', size: 8000, sizeLabel: '~400MB', acc: '70.8%', color: '#333' },
  { method: 'H.264 (Low)', size: 1200, sizeLabel: '~1.2MB', acc: '69.0%', color: '#4A90D9' },
  { method: 'LimitNet', size: 400, sizeLabel: '~400KB', acc: '64.2%', color: '#E8A820' },
  { method: 'DeepCOD\n(1/128)', size: 37, sizeLabel: '~37KB', acc: '67.0%', color: '#5BA85A' },
  { method: 'ApproxBit\n(128-NoEnc-B16)', size: 6.3, sizeLabel: '6.3KB', acc: '70.2%', color: '#CFB991' },
  { method: 'ApproxBit\n(64-Enc-B8)', size: 3.1, sizeLabel: '3.1KB', acc: '67.9%', color: '#CFB991' },
];

@Component({
  selector: 'app-compression',
  templateUrl: './compression.html',
  styleUrl: './compression.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
})
export class CompressionComponent {
  readonly compressItems = compressData.map(d => ({
    ...d,
    logH: d.size < 1 ? 8 : Math.max(8, Math.min(260, Math.log10(d.size + 1) / Math.log10(1201) * 260)),
    isApproxBit: d.color === '#CFB991',
    methodLines: d.method.split('\n'),
  }));
}
