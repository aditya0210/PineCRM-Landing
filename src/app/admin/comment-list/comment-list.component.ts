import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['BlogPost', 'CommentWriter', 'CommentContent', 'DateAdded', 'IsApproved'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.adminService.getAllComments().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  approveComment(id){
    console.log(id);
    this.adminService.approveComment({IsApproved: true}, id).subscribe(res => {
      this.adminService.getAllComments().subscribe(data => {
        this.dataSource.data = data;
      });
    }, error => {
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });
    });
  }
  
  unapproveComment(id){
    console.log(id);
    this.adminService.approveComment({IsApproved: false}, id).subscribe(res => {
      this.adminService.getAllComments().subscribe(data => {
        this.dataSource.data = data;
      });
    }, error => {
      this.toastr.error('Try Again', 'Something went wrong', {
        timeOut: 1500
      });
    });
  }
}
