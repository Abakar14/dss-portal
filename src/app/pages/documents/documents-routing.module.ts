import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';


export const routes: Routes = [
 
  {
     path: '', component: DocumentsComponent  
    }  
  
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ], 
  exports:[
    RouterModule
  ],
  providers:[
   
  ]
})
export class DocumentsRoutingModule { }
