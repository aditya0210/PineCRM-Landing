import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { AdminService } from '../admin.service';
import { CoverimgCroppingModelComponent } from '../coverimg-cropping-model/coverimg-cropping-model.component';
import { CroppingModelComponent } from '../cropping-model/cropping-model.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  addBlogForm: FormGroup;
  blogCategories = [];
  imgName1 = '';
  imgName2 = '';
  submitted = false;
  config = {
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [
        ['link', ['linkDialogShow', 'unlink']]
      ],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear'
          ]
        ],
      ]
    },
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['undo', 'redo']],
      // ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };

  disableButton = false;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.adminService.getCategory().subscribe(data => {
      this.blogCategories = data;
    });
    this.addBlogForm = this.fb.group({
      BlogTitle: ['', [Validators.required]],
      Content: ['', [Validators.required]],
      ImageOne: ['', [Validators.required]],
      ImageTwo: ['', [Validators.required]],
      ImageOne1: ['', [Validators.required]],
      ImageTwo1: ['', [Validators.required]],
      BlogCategory: ['', [Validators.required]],
      Shortdisc: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  get addBlogFormControl() {
    return this.addBlogForm.controls;
  }

  fileChangeEvent(event: any): void {
    console.log(event.target.files[0].name);
    const filename = event.target.files[0].name;
    const dialogRef = this.dialog.open(CroppingModelComponent, {
      width: '600px',
      disableClose: true,
      data: { name: filename, 
              img: event,
              ext: event.target.files[0].type.split('/').pop() 
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == '1') {
        this.addBlogForm.get('ImageOne1').reset();
      }
      this.addBlogForm.patchValue({
        ImageOne: result
      });
      this.imgName1 = result.name;
    });
  }

  fileChangeEvent1(event: any): void {
    console.log(event.target.files[0].name);
    const filename = event.target.files[0].name;
    const dialogRef = this.dialog.open(CoverimgCroppingModelComponent, {
      width: '600px',
      disableClose: true,
      data: { name: filename, img: event, ext: event.target.files[0].type.split('/').pop() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result == '1') {
        this.addBlogForm.get('ImageTwo1').reset();
      }
      this.addBlogForm.patchValue({
        ImageTwo: result
      });
      this.imgName2 = result.name;  
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.addBlogForm.value);
    if (this.addBlogForm.invalid) {
      return;
    }
    const obj = {
      BlogTitle: this.addBlogForm.get('BlogTitle').value,
      Content: this.addBlogForm.get('Content').value,
      ImageOne: null,
      ImageTwo: null,
      BlogCategory: (this.addBlogForm.get('BlogCategory').value).toString(),
      Shortdisc: this.addBlogForm.get('Shortdisc').value
    };
    console.log(obj);

    let formData = new FormData();
    formData.append("BlogTitle", this.addBlogForm.get('BlogTitle').value);
    formData.append("Content", this.addBlogForm.get('Content').value);
    formData.append("ImageOne", this.addBlogForm.get('ImageOne').value);
    formData.append("ImageTwo", this.addBlogForm.get('ImageTwo').value);
    formData.append("BlogCategory", this.addBlogForm.get('BlogCategory').value);
    formData.append("Shortdisc", this.addBlogForm.get('Shortdisc').value);

    console.log(this.addBlogForm.value);
    this.disableButton = true;
    this.adminService.addBlog(formData).subscribe(data => {
      this.disableButton = false;
      this.toastr.success('Successfully', 'Blog Added', {
        timeOut: 1500
      });
      console.log(data);
      this.router.navigate(['/admin/blog_list']);
    }, error => {
      this.disableButton = false;
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });
    });
  }
}
