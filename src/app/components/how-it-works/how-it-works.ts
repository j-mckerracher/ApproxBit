import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
})
export class HowItWorksComponent {
  readonly steps = [
    { num: '01', icon: '🧩', title: 'Smart Splitting', body: 'The AI model is split in two. Your device handles the first part (the easy pattern recognition), and sends only a compact summary to the server for the heavy analysis. The split point adjusts automatically based on your connection speed.', delay: '0.05s' },
    { num: '02', icon: '🔐', title: 'Binary Fingerprinting', body: 'Instead of sending floating-point numbers (32 bits each), ApproxBit converts them to single bits — 1 or 0. This learned compression shrinks data by up to 2,142× without losing the key patterns the AI needs to make accurate predictions.', delay: '0.1s' },
    { num: '03', icon: '📶', title: 'Network Awareness', body: 'ApproxBit constantly monitors your connection speed and automatically chooses the best configuration — balancing how much work your device does vs. how much data gets sent — to meet your speed or accuracy target in real time.', delay: '0.15s' },
  ];
}
