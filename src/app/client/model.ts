export class CreateClientDTO {
  password: string | undefined;
}

export class GetClientDTO {
  id: number | undefined;
  password: string | undefined;
}

export class AddActionDTO {
  clientID: number | undefined;
  password: string | undefined;
  delay: number | undefined;
  increase: number | undefined;
}

export class ClientDTO {
  id: number | undefined;
  password: string | undefined;
  counter: number | undefined;
  actions: ActionDTO[] | undefined;
  server: ServerDTO | undefined;
}

export class ActionDTO {
  delay: number | undefined;
  increment: string | undefined;
}

export class ServerDTO {
  ip: string | undefined;
  port: number | undefined;
}
