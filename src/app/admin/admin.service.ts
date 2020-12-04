import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  addCategory(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'customadmin/addcategory/', data);
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'customadmin/addcategory/');
  }

  addBlog(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'customadmin/addpost/', data);
  }

  getBlogs(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'customadmin/addpost/');
  }

  getAllComments(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'customadmin/approvecomment/');
  }

  approveComment(data, id): Observable<any> {
    return this.http.patch<any>(environment.baseUrl + 'customadmin/approvecomment/' + id + '/', data);
  }

  public getTrendingBlogs(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'blogs/trend/');
  }
}
