import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropping-model',
  templateUrl: './cropping-model.component.html',
  styleUrls: ['./cropping-model.component.scss']
})
export class CroppingModelComponent implements OnInit {
  imgData: any;
  croppedImage: any = '';
  imageChangedEvent: any = '';
  ext = 'png';
  file: any = '';
  constructor(
    public dialogRef: MatDialogRef<CroppingModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    this.imgData = data;
    this.imageChangedEvent = data.img;
    this.ext = data.ext;
  }

  onNoClick(): void {
    this.dialogRef.close('1');
  }

  ngOnInit() {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.file = this.base64ToFile(
      event.base64,
      this.imgData.name,
    );
  }

  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  loadImageFailed() {

  }

  onSubmit() {
    this.dialogRef.close(this.file);
  }
}
