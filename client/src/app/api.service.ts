import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  sendEmail(mail:any): Observable<any> {
    
    console.log("ApiService Email Values: Email: ", mail.sender, " , First Name: ", mail.fName, " , Last Name: ", mail.lName, " , Message: ", mail.message)
    // Remember to check for values being passed correctly.

    return this.http.post<any>('https://express-wup1.onrender.com/emailapi', mail)
  }
}
