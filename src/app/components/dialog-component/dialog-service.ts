import {ComponentRef, inject, Injectable, Injector, Type, ViewContainerRef} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {DialogConfig} from './dialog-config';
import {DialogRef} from './dialog-ref';
import {DialogInjector} from './dialog-injector';
import {take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private readonly _injector = inject(Injector);

  private _viewContainerRef?: ViewContainerRef;
  private _componentRef?: ComponentRef<DialogComponent>;

  public set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  constructor() {
  }

  public open(componentType: Type<any>, config?: DialogConfig): DialogRef {
    if (!this._viewContainerRef) {
      throw new Error(`ViewContainerRef not set : create an element in your app template with 'dialogRoot' directive.`)
    }

    this.removeDialog();

    const map = new WeakMap();
    map.set(DialogConfig, config || {});

    const dialogRef = new DialogRef(config?.closeValue || false, config?.closeDelay || 0);
    map.set(DialogRef, dialogRef);

    dialogRef.afterClosed.pipe(
      take(1)
    ).subscribe(() => {
      this.removeDialog();
    });

    this._componentRef = this._viewContainerRef.createComponent(DialogComponent, {injector: new DialogInjector(this._injector, map)});

    this._componentRef.instance.childComponentType = componentType;

    return dialogRef;
  }

  private removeDialog(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = undefined;
    }
  }
}
