import { Subject } from 'rxjs';

/*
  Unsubscribe decorator
  Decorator adds _destroyed$ observable to identify if the component destroyed.
  Use it with subscriptions to unsubscribe automatically. Use it with untilDestroyed helper.

  Example:
  @Unsubscribe()
  @Component({})
  export class YourComponent implements OnInit {
    yourObservable$: Observable<any>;
    ngOnInit () {
      yourObservable$.pipe(untilDestroyed(this)).subscribe(...)
    }
    ...
  }

  If you don't want to use untilDestroyed helper use takeUntil((this as any)._destroyed$)
*/

export function Unsubscribe(): (any: any) => void {
  return (componentClass: any) => {
    const destroyHook = componentClass.prototype.ngOnDestroy;
    componentClass.prototype._destroyed$ = new Subject<void>();
    componentClass.prototype.ngOnDestroy = function () {
      componentClass.prototype._destroyed$.next();
      if (destroyHook) {
        destroyHook.apply(this);
      }
    };
  };
}
