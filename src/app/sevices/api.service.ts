import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postData(data: object){
    return this.http.post<any>('http://localhost:3000/users/', data);
  }

  getData(){
    return this.http.get<any>('http://localhost:3000/users/');
  }

  putData(data: any, id: any){
    return this.http.put<any>('http://localhost:3000/users/'+id, data);
  }

  deleteData(id: any){
    return this.http.delete<any>('http://localhost:3000/users/'+id);
  }

}
