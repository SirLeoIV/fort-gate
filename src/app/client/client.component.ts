import { Component } from '@angular/core';
import {Method} from "./method";
import {HttpService} from "../http.service";
import {ClientDTO} from "./model";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  id: number | undefined;
  password: string = "";
  increase: number = 0;
  delay: number = 0;
  method: Method = Method.CREATE;

  client: ClientDTO | undefined;

  URL: string = environment.host;
  customHost: boolean = false;

  host: string = "http://localhost";
  port: number = 8080;

  protected readonly Method = Method;

  constructor(private httpService: HttpService) {}

  submit() {
    let url = this.customHost ? this.host + ":" + this.port : this.URL;
    console.log("url: " + url);
    if (this.method == Method.CREATE) {
      this.httpService.createClient({password: this.password}, url)
        .subscribe(it => {
          this.mapToFields(it);
        });
    } else if (this.method == Method.GET) {
      this.httpService.getClient({id: this.id, password: this.password}, url)
        .subscribe(it => {
          this.mapToFields(it);
        });
    } else {
      this.httpService.addAction({
        clientID: this.id,
        password: this.password,
        increase: this.increase,
        delay: this.delay}, url)
        .subscribe(it => {
          this.mapToFields(it);
        });
    }
  }

  hello() {
    let url = this.customHost ? this.host + ":" + this.port : this.URL;
    this.httpService.hello(url).subscribe(it => {
      console.log(it);
    });
  }

  private mapToFields(it: ClientDTO) {
    this.client = it;
    this.id = it.id;
    this.password = it.password ? it.password : "";
    console.log(it);
  }
}
