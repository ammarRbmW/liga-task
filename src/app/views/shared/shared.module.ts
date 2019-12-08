import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {
  MatButtonModule, MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSidenavModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {FullComponent} from './layout/full/full.component';
import {BlankComponent} from './layout/blank/blank.component';
import {ValidationMessageComponent} from './form/validation-message/validation-message.component';
import {InputValidationComponent} from './form/input-validation/input-validation.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DeleteDialogComponent} from './dialog/delete-dialog/delete-dialog.component';
import {ImageUploadComponent} from './form/image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    ExtendedModule,
    FlexModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    FullComponent,
    BlankComponent,
    InputValidationComponent,
    ValidationMessageComponent,
    DeleteDialogComponent,
    ImageUploadComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputValidationComponent,
    ValidationMessageComponent,
    DeleteDialogComponent,
    ImageUploadComponent
  ],

  entryComponents: [
    DeleteDialogComponent,
  ]
})
export class SharedModule {
}
