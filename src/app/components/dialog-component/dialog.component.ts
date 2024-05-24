import {AfterViewInit, ChangeDetectorRef, Component, ComponentRef, inject, OnDestroy, signal, Type, ViewChild, WritableSignal} from '@angular/core';
import {DialogConfig} from './dialog-config';
import {DialogRef} from './dialog-ref';
import {DialogChildDirective} from './dialog-child.directive';
import {NgClass} from '@angular/common';
import {take} from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [
    DialogChildDirective,
    NgClass
  ],
  standalone: true
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _dialogRef = inject(DialogRef);
  private readonly _config = inject(DialogConfig);

  private _childComponentType?: Type<any>;
  private _childComponentRef?: ComponentRef<any>;

  public overlayStyles: WritableSignal<string[]>;
  public containerStyles: WritableSignal<string[]>;

  @ViewChild(DialogChildDirective, {static: true}) private _dialogChildDirective!: DialogChildDirective;

  public set childComponentType(type: Type<any>) {
    this._childComponentType = type;
  }

  public get overlayClassNames(): string[] {
    return this._config.overlayClassNames || [];
  }

  public get closeOverlayClassNames(): string[] {
    return this._config.closeOverlayClassNames || [];
  }

  public get containerClassNames(): string[] {
    return this._config.containerClassNames || [];
  }

  public get closeContainerClassNames(): string[] {
    return this._config.closeContainerClassNames || [];
  }

  constructor() {
    this.overlayStyles = signal<string[]>([...(this.overlayClassNames || []) || 'dialog-overlay']);
    this.containerStyles = signal<string[]>([...(this.containerClassNames || []) || 'dialog-container']);
  }

  ngAfterViewInit(): void {
    if (this._childComponentType) {
      this._dialogChildDirective.viewContainerRef.clear();
      this._childComponentRef = this._dialogChildDirective.viewContainerRef.createComponent(this._childComponentType);
      this._changeDetectorRef.detectChanges();

      this._dialogRef.onClose.pipe(
        take(1)
      ).subscribe(() => {
        if (this.closeOverlayClassNames && this.closeOverlayClassNames.length > 0) {
          this.overlayStyles.update((values: string[]) => [...values, ...this.closeOverlayClassNames!]);
        }

        if (this.closeContainerClassNames && this.closeContainerClassNames.length > 0) {
          this.containerStyles.update((values: string[]) => [...values, ...this.closeContainerClassNames!]);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this._childComponentRef) {
      this._childComponentRef.destroy();
    }
  }

  public onClickOverlay(): void {
    if (!this._config.disableOverlayClose) {
      this.close();
    }
  }

  public close(result?: any): void {
    this._dialogRef.close(result || this._config.closeValue || false);
  }
}
