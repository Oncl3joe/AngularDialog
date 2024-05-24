import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './components/dialog-component/dialog.component';
import {DialogService} from './components/dialog-component/dialog-service';
import {DialogRootDirective} from './components/dialog-component/dialog-root.directive';
import {ExampleDialogComponent} from './components/example-dialog/example-dialog.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DialogComponent, DialogRootDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private dialogService: DialogService = inject(DialogService);

  constructor() {
  }

  public openDialog(): void {
    this.dialogService.open(ExampleDialogComponent, {
      data: {message: 'Helloworld'},
      overlayClass: 'pink-overlay',
      closeOverlayClass: 'close-pink-overlay',
      containerClass: 'custom-dialog',
      closeContainerClass: 'close-custom-dialog',
      closeDelay: 300
    }).afterClosed.subscribe((result: any) => {
      console.log(result);
    });
  }
}
