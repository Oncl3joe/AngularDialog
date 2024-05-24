export class DialogConfig<D = any> {
  data?: D;
  disableOverlayClose?: boolean;
  closeValue?: any;
  overlayClass?: string;
  closeOverlayClass?: string;
  containerClass?: string;
  closeContainerClass?: string;
  closeDelay?: number;
}
