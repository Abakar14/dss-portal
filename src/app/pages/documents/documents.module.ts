import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentService } from '../../services/document.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, DocumentsRoutingModule
  ], providers: [
    DocumentService
  ]
})
export class DocumentsModule { }
