export class CreateClientDTO {
  name: string | undefined;
  password: string | undefined;
}

export class GetClientDTO {
  name: string | undefined;
  password: string | undefined;
}

export class AddActionDTO {
  clientName: string | undefined;
  password: string | undefined;
  delay: number | undefined;
  increase: number | undefined;
}

export class ClientDTO {
  name: string | undefined;
  password: string | undefined;
  counter: number | undefined;
  actions: ActionDTO[] | undefined;
}

export class ActionDTO {
  delay: number | undefined;
  increment: string | undefined;
}
