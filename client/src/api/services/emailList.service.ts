import {AxiosResponse} from "axios";
import {IEmailList} from "../models/IEmailList";
import $api from "../http";

export default class EmailListService {
  static async makeEmailList(name: string, emails: string[]): Promise<AxiosResponse<IEmailList>> {
    return $api.post('/emailList', {name, emails})
  }

  static async deleteEmailList(id: string): Promise<AxiosResponse<IEmailList>> {
    return $api.delete('/emailList/' + id)
  }

  static async getEmailList(id: string): Promise<AxiosResponse<IEmailList>> {
    return $api.get('/emailList/' + id)
  }

  static async getEmailLists(): Promise<AxiosResponse<IEmailList[]>> {
    return $api.get('/emailLists')
  }

  static async addEmailsToEmailList(id: string, emails: string[]): Promise<AxiosResponse<IEmailList>> {
    return $api.put('/emailList/' + id + '/emails', {emails})
  }

  static async deleteEmailsFromEmailList(id: string, emails: string[]): Promise<AxiosResponse<IEmailList>> {
    return $api.delete('/emailList/' + id + '/emails', {data: {emails}})
  }
}