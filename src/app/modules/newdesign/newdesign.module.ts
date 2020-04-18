import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';

import { NewdesignRoutingModule } from './newdesign-routing.module';
import { NewdesignComponent } from './newdesign.component';
import { NewdesignService } from './newdesign.service';
import { SharedModule } from '@modules/shared/shared.module';
import { UploadService } from './upload.service';
// import { FileUploaderComponent } from '@shared/ui/file-uploader/file-uploader.component';



@NgModule({
  declarations: [NewdesignComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NewdesignRoutingModule,
    MatInputModule, 
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule,
    
  ],
  providers: [
    NewdesignService,
    UploadService
  ]
})
export class NewdesignModule { }
