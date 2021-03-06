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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';

import { DesignRoutingModule } from './design-routing.module';
import { SharedModule } from '@modules/shared/shared.module';
import { DesignService } from './design.service';
import { UploadService } from './upload.service';
import { DesignComponent } from './design.component';
import { ListsComponent } from './lists/lists.component';
import { NewComponent } from './new/new.component';
// import { ShowComponent } from './show/show.component';
import { InnerListComponent } from './inner-list/inner-list.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DesignFormComponent } from './design-form/design-form.component';
// import { FileUploaderComponent } from '@shared/ui/file-uploader/file-uploader.component';



@NgModule({
  declarations: [DesignComponent, ListsComponent, NewComponent, InnerListComponent, EditComponent, DetailsComponent, DesignFormComponent],
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
    MatIconModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [
    DesignService,
    UploadService
  ],
  exports: [
    
  ]
})
export class DesignModule { }
