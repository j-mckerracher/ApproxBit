import { Directive, ElementRef, inject, afterNextRender } from '@angular/core';
import { DestroyRef } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective {
  private el = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );

      observer.observe(this.el.nativeElement);

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
      });
    });
  }
}
