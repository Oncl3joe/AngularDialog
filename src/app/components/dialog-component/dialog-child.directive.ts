import {Directive, inject, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dialogChild]',
  standalone: true
})
export class DialogChildDirective {

  private readonly _viewContainerRef = inject(ViewContainerRef);

  public get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  constructor() {
  }
}
