import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly canvasEl = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasRef');

  readonly stats = [
    { num: '2142×', label: 'Data Shrinkage' },
    { num: '34%', label: 'Faster than Edge-Only' },
    { num: '3.1KB', label: 'Smallest Transfer' },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const canvas = this.canvasEl().nativeElement;
      const ctx = canvas.getContext('2d')!;
      let cols: number;
      let drops: number[];
      let animFrameId: number;

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cols = Math.floor(canvas.width / 18);
        drops = Array(cols).fill(0).map(() => Math.random() * -50);
      }

      function draw() {
        ctx.fillStyle = 'rgba(10,10,10,0.07)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#CFB991';
        ctx.font = '13px DM Mono, monospace';
        drops.forEach((y, i) => {
          const char = Math.random() > 0.5 ? '1' : '0';
          ctx.fillText(char, i * 18, y * 18);
          drops[i] = y > canvas.height / 18 + 5 ? Math.random() * -15 : y + 0.4;
        });
        animFrameId = requestAnimationFrame(draw);
      }

      window.addEventListener('resize', resize);
      resize();
      draw();

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animFrameId);
      });
    });
  }
}
