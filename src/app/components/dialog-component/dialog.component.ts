import {AfterViewInit, ChangeDetectorRef, Component, ComponentRef, inject, OnDestroy, Type, ViewChild} from '@angular/core';
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
  private _isClosed: boolean = false;

  @ViewChild(DialogChildDirective, {static: true}) private _dialogChildDirective!: DialogChildDirective;

  public set childComponentType(type: Type<any>) {
    this._childComponentType = type;
  }

  public get overlayClass(): string | null {
    return this._config.overlayClass || null;
  }

  public get closeOverlayClass(): string | null {
    return this._config.closeOverlayClass || null;
  }

  public get containerClass(): string | null {
    return this._config.containerClass || null;
  }

  public get closeContainerClass(): string | null {
    return this._config.closeContainerClass || null;
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    if (this._childComponentType) {
      this._dialogChildDirective.viewContainerRef.clear();
      this._childComponentRef = this._dialogChildDirective.viewContainerRef.createComponent(this._childComponentType);
      this._changeDetectorRef.detectChanges();

      this._dialogRef.onClose.pipe(
        take(1)
      ).subscribe(() => {
        this._isClosed = true;
      });
    }
  }

  ngOnDestroy(): void {
    if (this._childComponentRef) {
      this._childComponentRef.destroy();
    }
  }

  public getOverlayClass(): string[] {
    const classNames: string[] = [this.overlayClass || 'dialog-overlay'];

    if (this._isClosed && this.closeOverlayClass) {
      classNames.push(this.closeOverlayClass);
    }

    return classNames;
  }

  public getContainerClass(): string[] {
    const classNames: string[] = [this.containerClass || 'dialog-container'];

    if (this._isClosed && this.closeContainerClass) {
      classNames.push(this.closeContainerClass);
    }

    return classNames;
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
