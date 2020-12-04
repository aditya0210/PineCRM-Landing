import { Component, OnInit } from '@angular/core';
import { LandingService } from '../landing.service';
declare var $: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent implements OnInit {
  constructor(private landingService: LandingService) { }
  p: number = 1;
  blogslist: any = [];
  categorylist: any = [];
  trendingBlogs: any = [];
  
 ngOnInit() {

  //get blogs
   this.landingService.getBlogs().subscribe(res =>{
       this.blogslist = res;
       console.log(res);
   });

   //get Category
   this.landingService.getCategory().subscribe(res1 =>{
     this.categorylist = res1;
     console.log("category===",res1);  
   })

   //get trending blogs
   this.landingService.getTrendingBlogs().subscribe(res2 =>{
     this.trendingBlogs = res2;
     console.log("trending blogs ==>",res2);
   })

 }
 
}
