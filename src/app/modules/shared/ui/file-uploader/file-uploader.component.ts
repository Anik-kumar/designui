import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { isNil, isEmpty} from 'lodash'

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  public files: Set<File> = new Set();
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  @Output() filesAdded = new EventEmitter();
  @Output() onAddFiles = new EventEmitter();
  @Output() onFileAttached = new EventEmitter();
  // @Output() onClickSubSubMenu = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }


  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    
    if (!isNil(files) && !isEmpty(files)) {
      //this.onFileAttached.emit();
      for (let key in files) {
        if (!isNaN(parseInt(key))) {
          this.files.add(files[key]);
        }
      }
  
      this.filesAdded.emit(this.files);
    }
    
  }

  addFiles() {
    this.file.nativeElement.click();
    this.onAddFiles.emit();
  }
}
