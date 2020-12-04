import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      blogCategory: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.categoryForm.value);
    if (this.categoryForm.invalid) {
      return;
    }
    this.adminService.addCategory(this.categoryForm.value).subscribe(res => {
      console.log(res);
      this.toastr.success('Successfully', 'Category Added', {
        timeOut: 1500
      });
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });
    });
  }
}
