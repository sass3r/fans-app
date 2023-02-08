import { Directive, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { debounceTime, Subscription, Observable } from 'rxjs';

@Directive({
  selector: '[appIntersectionObserver]',
  exportAs: 'intersection'
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {

  @Input() root: HTMLElement | null = null;
  @Input() rootMargin = '0px 0px 100px 0px';
  @Input() threshold = 0;
  @Input() debounceTime = 250;
  @Input() isContinuous = false;
  @Output() isIntersecting = new EventEmitter<boolean>()
  intersecting = false;
  subscription: Subscription
  _isIntersecting = false

  constructor(private element: ElementRef) {
    this.subscription = new Subscription();
  }

  ngOnInit () {
    this.subscription = this.createAndObserve()
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }

  createAndObserve () {
    const options: IntersectionObserverInit = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold,
    }

    return new Observable<boolean>(subscriber => {
      const intersectionObserver = new IntersectionObserver(entries => {
        const { isIntersecting } = entries[0]
        subscriber.next(isIntersecting)

        isIntersecting &&
          !this.isContinuous &&
          intersectionObserver.disconnect()
      }, options)

      intersectionObserver.observe(this.element.nativeElement)

      return {
        unsubscribe () {
          intersectionObserver.disconnect()
        },
      }
    })
      .pipe(debounceTime(this.debounceTime))
      .subscribe(status => {
        this.isIntersecting.emit(status)
        this._isIntersecting = status
      })
  }

}
