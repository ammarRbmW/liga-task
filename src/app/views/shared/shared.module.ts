import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {FullComponent} from './layout/full/full.component';
import {BlankComponent} from './layout/blank/blank.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, FullComponent, BlankComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    ExtendedModule,
    FlexModule
  ]
})
export class SharedModule {
}
