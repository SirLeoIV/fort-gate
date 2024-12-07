import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddActionDTO, ClientDTO, CreateClientDTO, GetClientDTO} from "./client/model";
import {catchError, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient) {
  }

  $errorMessage: Subject<string> = new Subject<string>();

  createClient(createClientDTO: CreateClientDTO, url: string): Observable<string> {
    return this.http.post(url + "/client", createClientDTO, {
      withCredentials: true, responseType: "text"}).pipe(
         catchError(error => {
           console.log(error)
           if (typeof error.error === 'string') {
             this.$errorMessage.next(error.error);
           }
            return [];
         })
      );
  }

  getClient(getClientDTO: GetClientDTO, url: string): Observable<ClientDTO> {
    return this.http.post<ClientDTO>(url + "/counter", getClientDTO, {
      withCredentials: true}).pipe(
        catchError(error => {
          console.log(error)
          if (typeof error.error === 'string') {
            this.$errorMessage.next(error.error);
          }
          return [];
        })
      );
  }

  addAction(addActionDTO: AddActionDTO, url: string): Observable<ClientDTO>{
    return this.http.post<ClientDTO>(url + "/action", addActionDTO, {
      withCredentials: true}).pipe(
        catchError(error => {
          console.log(error)
          if (typeof error.error === 'string') {
            this.$errorMessage.next(error.error);
          }
          return [];
        })
      );
  }

  hello(url: string) {
    return this.http.get<string>(url + "/hello").pipe();
  }
}
