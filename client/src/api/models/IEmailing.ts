import {IEmailStatus} from "./IEmailStatus";

export interface IEmailing {
  name: string
  inProcess: boolean
  emailsStatus: IEmailStatus[]
  emailListId: string
  emailTemplateId: string
  userId: string
  id: string
}