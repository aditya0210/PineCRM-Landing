import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { MaterialModule } from '../shared/material.module';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CroppingModelComponent } from './cropping-model/cropping-model.component';
import { CoverimgCroppingModelComponent } from './coverimg-cropping-model/coverimg-cropping-model.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdmindashboardComponent
      },
  
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
 
];

@NgModule({
  declarations: [
    AdmindashboardComponent,
    BlogListComponent,
    CommentListComponent,
    CategoryListComponent,
    AdminComponent,
    AddBlogComponent,
    AddCategoryComponent,
    CroppingModelComponent,
    CoverimgCroppingModelComponent,
    BlogDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    ImageCropperModule
  ],
  entryComponents: [
    AddCategoryComponent,
    CroppingModelComponent,
    CoverimgCroppingModelComponent
  ]
})
export class AdminModule { }
