import {Component} from '@angular/core';
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

  name: string | undefined;
  password: string = "";
  increase: number = 0;
  delay: number = 0;
  method: Method = Method.CREATE;

  client: ClientDTO | undefined;

  URL: string = environment.host;
  customHost: boolean = true;

  host: string = "http://localhost";
  port: number = 8080;

  protected readonly Method = Method;
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private httpService: HttpService) {
    httpService.$errorMessage.subscribe(it => {
      // console.log(it);
      this.errorMessage = it;
      this.client = undefined;
    });
  }

  submit() {
    let url = this.customHost ? this.host + ":" + this.port : this.URL;
    // console.log("url: " + url);
    this.httpService.$errorMessage.next("");
    this.successMessage = "";
    if (this.method == Method.CREATE) {
      this.httpService.createClient({name: this.name, password: this.password}, url)
        .subscribe(() => {
          this.successMessage = "Client created successfully";
        });
    } else if (this.method == Method.GET) {
      this.httpService.getClient({name: this.name, password: this.password}, url)
        .subscribe(
          it => {
          this.mapToFields(it);
        });
    } else {
      this.httpService.addAction({
        clientName: this.name,
        password: this.password,
        increase: this.increase,
        delay: this.delay}, url)
        .subscribe(it => {
          this.mapToFields(it);
        });
    }
  }

  private mapToFields(it: ClientDTO) {
    this.client = it;
    this.name = it.name;
    this.password = it.password ? it.password : "";
    // console.log(it);
  }

  changeDelay(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = Math.min(parseInt(inputElement.value, 10), 2000);

    if (!isNaN(parsedValue)) {
      this.delay = parsedValue;
    } else {
      this.delay = 0; // Handle invalid cases if necessary
    }
    inputElement.value = this.delay.toString(); // Ensure the displayed value matches the model
  }

  changeIncrease($event: Event) {
    const inputElement = $event.target as HTMLInputElement;
    const parsedValue = Math.min(parseInt(inputElement.value, 10), 2000);

    if (!isNaN(parsedValue)) {
      this.increase = parsedValue;
    } else {
      this.increase = 0; // Handle invalid cases if necessary
    }
    inputElement.value = this.increase.toString(); // Ensure the displayed value matches the model
  }
}
