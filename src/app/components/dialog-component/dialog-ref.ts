import {Observable, Subject, timer} from 'rxjs';

export class DialogRef {

  private readonly _onClose = new Subject<void>();
  private readonly _afterClosed = new Subject<any>();
  private readonly _defaultValue: any;
  private readonly _closeDelay: any;

  public get onClose(): Observable<any> {
    return this._onClose.asObservable();
  }

  public get afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }

  constructor(defaultValue: any = false, closeDelay: number = 0) {
    this._defaultValue = defaultValue;
    this._closeDelay = closeDelay;
  }

  public close(result?: any): void {
    this._onClose.next();

    timer(this._closeDelay).subscribe(() => {
      this._afterClosed.next(result || this._defaultValue);
    });
  }
}
