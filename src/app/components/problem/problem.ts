import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.html',
  styleUrls: ['./problem.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollRevealDirective],
})
export class ProblemComponent {}
