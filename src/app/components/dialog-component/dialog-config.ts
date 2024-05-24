export class DialogConfig<D = any> {
  data?: D;
  disableOverlayClose?: boolean;
  closeValue?: any;
  overlayClassNames?: string[];
  closeOverlayClassNames?: string[];
  containerClassNames?: string[];
  closeContainerClassNames?: string[];
  closeDelay?: number;
}
