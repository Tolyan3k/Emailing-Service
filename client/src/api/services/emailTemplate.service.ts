import {AxiosResponse} from "axios";
import {IEmailTemplate} from "../models/IEmailTemplate";
import $api from "../http";

export default class EmailTemplateService {
  static async makeEmailTemplate(title: string,
                                 header: string,
                                 body: string,
                                 footer: string): Promise<AxiosResponse<IEmailTemplate>> {
    return $api.post('/emailTemplate', {title, header, body, footer})
  }

  static async deleteEmailTemplate(id: string): Promise<AxiosResponse<IEmailTemplate>> {
    return $api.delete('/emailTemplate/' + id)
  }

  static async updateEmailTemplate(id: string,
                                   title?: string,
                                   header?: string,
                                   body?: string,
                                   footer?: string
  ): Promise<AxiosResponse<IEmailTemplate>> {
    return $api.put('emailTemplate/' + id, {data: {title, header, body, footer}})
  }

  static async getEmailTemplate(id: string): Promise<AxiosResponse<IEmailTemplate>> {
    return $api.get('/emailTemplate/' + id)
  }

  static async getEmailTemplates(): Promise<AxiosResponse<IEmailTemplate[]>> {
    return $api.get('/emailTemplates')
  }
}