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
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';

import { DesignRoutingModule } from './design-routing.module';
import { DesignComponent } from './design.component';
import { DesignService } from './design.service';
import { SharedModule } from '@modules/shared/shared.module';
import { UploadService } from './upload.service';
import { ListsComponent } from './lists/lists.component';
import { NewComponent } from './new/new.component';
// import { FileUploaderComponent } from '@shared/ui/file-uploader/file-uploader.component';



@NgModule({
  declarations: [DesignComponent, ListsComponent, NewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DesignRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [
    DesignService,
    UploadService
  ]
})
export class DesignModule { }
