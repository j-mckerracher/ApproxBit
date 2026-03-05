import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { ProblemComponent } from './components/problem/problem';
import { DemoComponent } from './components/demo/demo';
import { CompressionComponent } from './components/compression/compression';
import { HowItWorksComponent } from './components/how-it-works/how-it-works';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    HeroComponent,
    ProblemComponent,
    DemoComponent,
    CompressionComponent,
    HowItWorksComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
