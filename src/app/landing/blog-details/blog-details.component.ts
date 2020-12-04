import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { LandingService } from '../landing.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})

export class BlogDetailsComponent implements OnInit {
  commentForm: FormGroup;
  blogDetails: any;
  showCommentField: boolean = false;
  commentsLength: number = 0;
  alreadyLogin = false;
  paramsid: any;
  categorylist: any = []
  trendingBlogs: any = [];
  constructor(
    private _route: ActivatedRoute,
    private landingService: LandingService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    this.landingService.getTrendingBlogs().subscribe(res2 =>{
      this.trendingBlogs = res2;
      console.log("trending blogs ==>",res2);
    })

    this.landingService.getCategory().subscribe(res => {
      this.categorylist = res;
    })
    
    this.alreadyLogin = this.authService.currentUserValue;
    
    this._route.params.
      subscribe(params => {
        this.paramsid = params['id'];
        this.landingService.getBlogDetails(params['id'])
          .pipe()
          .subscribe(data => {
            console.log(data);
            if (data.comments.length == 0) {
              this.showCommentField = false;
            } else {
              this.showCommentField = true;
            }
            this.commentsLength = data.comments.length;
            this.blogDetails = data;
          });
      });
       this.commentForm = this.fb.group({
       CommentContent: ['', [Validators.required]]
    });
  }

  addComment(){
    // this.authService.addComment({isLogin:true, blogId: this.paramsid})
    this.router.navigate(['/login'])
  }

  
  onSubmit() {
    if (this.commentForm.invalid) {
      this.toastr.error('In comment box', 'Please add text ', {
        timeOut: 1500
      });
      return;
    }
    console.log(this.commentForm.value);
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const obj = {
      BlogPost: this.paramsid,
      CommentWriter: userDetails.user.pk,
      CommentContent: this.commentForm.get('CommentContent').value
    };

    this.landingService.addComment(obj).subscribe(res => {
      this.toastr.success('Kindly wait for review', 'Your Comment has been posted successfully', {
        timeOut: 3000
      });
      // alert('Your Comment has been posted successfully. Kindly wait for review.')
      console.log(res);
      this.commentForm.reset();
    }, error => {
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 3000
      });
    });
  }

  

  
}
