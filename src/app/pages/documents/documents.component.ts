import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
    selector: 'bms-documents',
    imports: [MaterialModule],
    templateUrl: './documents.component.html',
    styleUrl: './documents.component.scss'
})
export class DocumentsComponent {



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    // Store file and handle the upload with your DocumentService
  }
  
  uploadFile() {
    // Call your DocumentService to upload the file
  }

}
