import $api from "../http";
import {AxiosResponse} from "axios";
import {IEmail} from "../models/IEmail";

export default class EmailService {
  static async addEmail(email: string, tags: string[]): Promise<AxiosResponse<IEmail>> {
    return $api.post('/email', {email, tags})
  }

  static async deleteEmail(email: string): Promise<AxiosResponse<IEmail>> {
    return $api.delete('/email', {data: {email}})
  }

  static async getEmail(email: string): Promise<AxiosResponse<IEmail>> {
    return $api.get('/email', {data: {email}})
  }

  static async getEmails(): Promise<AxiosResponse<IEmail[]>> {
    return $api.get('/emails')
  }

  static async addTagsToEmail(email: string, tags: string[]): Promise<AxiosResponse<IEmail>> {
    return $api.post('/email/tags', {email, tags})
  }

  static async deleteTagsFromEmail(email: string, tags: string[]): Promise<AxiosResponse<IEmail>> {
    return $api.delete('/email/tags', {data: {email, tags}})
  }

  static async getTags(): Promise<AxiosResponse<string[]>> {
    return $api.get('/emails/tags')
  }
}