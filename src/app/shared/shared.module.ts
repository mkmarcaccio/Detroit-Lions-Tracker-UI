import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    HeaderComponent,
    DefaultLayoutComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,

    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatStepperModule
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class SharedModule { }