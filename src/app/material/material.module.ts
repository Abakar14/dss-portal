import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltip} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatSort } from '@angular/material/sort';

const MaterialComponents = [
  MatButtonModule,  
  MatSlideToggleModule,
  MatPaginatorModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTooltip,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatSort,
  MatPaginator  
]

@NgModule({
   imports: [
    MaterialComponents,

  ], 
  exports: [
    MaterialComponents, 
  ]
})
export class MaterialModule { }
