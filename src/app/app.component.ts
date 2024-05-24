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
      overlayClassNames: ['custom-overlay', 'overlay-show'],
      closeOverlayClassNames: ['overlay-hide'],
      containerClassNames: ['custom-container', 'container-show'],
      closeContainerClassNames: ['container-hide'],
      closeDelay: 300
    }).afterClosed.subscribe((result: any) => {
      console.log(result);
    });
  }
}
