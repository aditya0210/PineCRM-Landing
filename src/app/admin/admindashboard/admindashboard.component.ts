import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  blogCount= 0;
  commentCount = 0;
  trendingBlogs = [];
  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.adminService.getBlogs().subscribe(data => {
      this.blogCount = data.length;
    }, error => {
      this.blogCount = 0;
    });
    
    this.adminService.getTrendingBlogs().subscribe(data =>  {
      console.log(data);
      
      this.trendingBlogs = data;
    })

    this.adminService.getAllComments().subscribe(data => {
      this.commentCount = data.length;
    }, error => {
      this.commentCount = 0;
    })
  }

}
