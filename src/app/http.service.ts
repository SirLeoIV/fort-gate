import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddActionDTO, ClientDTO, CreateClientDTO, GetClientDTO} from "./client/model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient) {
  }

  createClient(createClientDTO: CreateClientDTO, url: string): Observable<ClientDTO> {
    return this.http.post<ClientDTO>(url + "/client", createClientDTO, {
      withCredentials: true}).pipe();
  }

  getClient(getClientDTO: GetClientDTO, url: string): Observable<ClientDTO> {
    return this.http.post<ClientDTO>(url + "/counter", getClientDTO, {
      withCredentials: true}).pipe();
  }

  addAction(addActionDTO: AddActionDTO, url: string): Observable<ClientDTO>{
    return this.http.post<ClientDTO>(url + "/action", addActionDTO, {
      withCredentials: true}).pipe();
  }

  hello(url: string) {
    return this.http.get<string>(url + "/hello").pipe();
  }
}
