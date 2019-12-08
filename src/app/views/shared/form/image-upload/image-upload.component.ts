import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ImageUploadComponent,
      multi: true
    }
  ]
})
export class ImageUploadComponent implements OnInit {
  public formGroup: FormGroup;
  @Input() field: string;
  @Input() placeholder: string;
  @Input() inputForm: FormGroup;


  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;
  fileToUpload: File = null;
  base64textString = [];

  constructor(private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.formGroup = this.inputForm;

    if (this.inputForm.controls[this.field].value) {
      this.base64textString.push(this.inputForm.controls[this.field].value);
    }

  }

  onFileChange(files: FileList) {

    this.base64textString = [];
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.size > 4240000) {
      this.inputForm.controls[this.field].reset();

      this.snackBar.open(
        'Please choose an image size less than 4 MBs..', 'Error',
        {
          duration: 2000,
        });
    }

    if (this.fileToUpload) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.fileToUpload);
      this.inputForm.controls[this.field].setValue(this.base64textString);

    }

  }

  handleReaderLoaded(e) {
    this.base64textString.push('data:image/jpeg;base64,' + btoa(e.target.result));
  }
}
