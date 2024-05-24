import {Directive, inject, ViewContainerRef} from '@angular/core';
import {DialogService} from './dialog-service';

@Directive({
  selector: '[dialogRoot]',
  standalone: true
})
export class DialogRootDirective {

  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _dialogService = inject(DialogService);

  constructor() {
    this._dialogService.viewContainerRef = this._viewContainerRef;
  }
}
