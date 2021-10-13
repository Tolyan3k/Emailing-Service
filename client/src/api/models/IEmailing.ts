import {IEmailStatus} from "./IEmailStatus";

export interface IEmailing {
  name: string
  emailsStatus: IEmailStatus[],
  emailListId: string
  emailTemplateId: string
  userId: string
  id: string
}