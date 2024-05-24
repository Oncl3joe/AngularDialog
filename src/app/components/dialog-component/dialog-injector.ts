import {InjectFlags, InjectOptions, Injector, ProviderToken} from '@angular/core';

export class DialogInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    private _additionalTokens: WeakMap<any, any>
  ) {
  }

  get<T>(token: ProviderToken<T>, notFoundValue: undefined, options: InjectOptions & { optional?: false }): T;
  get<T>(token: ProviderToken<T>, notFoundValue: null | undefined, options: InjectOptions): T | null;
  get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions | InjectFlags): T;
  get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any): any;

  get(token: any, notFoundValue?: any, options?: (InjectOptions & { optional?: false }) | InjectOptions | InjectFlags): any {
    const value = this._additionalTokens.get(token);

    if (value)
      return value;

    return this._parentInjector.get<any>(token, notFoundValue);
  }
}
