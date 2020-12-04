import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) { }

  public getBlogs(): Observable<any> {
    return this.http.get(environment.baseUrl + 'blogs/all/');
  }

  getBlogDetails(id) {
    return this.http.get<any>(environment.baseUrl + 'blogs/all/' + id + '/');
  }

  public addComment(data): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'blogs/comment/', data);
  }

  public getCategory(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'blogs/category/');
  }

  public getTrendingBlogs(): Observable<any> {
    return this.http.get<any>(environment.baseUrl + 'blogs/trend/');
  }

}
