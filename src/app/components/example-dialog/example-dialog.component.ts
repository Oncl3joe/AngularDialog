import {Component, inject} from '@angular/core';
import {DialogRef} from '../dialog-component/dialog-ref';
import {DialogConfig} from '../dialog-component/dialog-config';

@Component({
  selector: 'app-example-dialog',
  templateUrl: './example-dialog.component.html',
  styleUrls: ['./example-dialog.component.scss'],
  standalone: true
})
export class ExampleDialogComponent {

  private dialogRef: DialogRef = inject(DialogRef);
  private config: DialogConfig = inject(DialogConfig);

  public message: string = 'Default';

  constructor() {
    if (this.config.data?.message) {
      this.message = this.config.data.message;
    }
  }

  public close(): void {
    this.dialogRef.close();
  }
}
