import {AxiosResponse} from "axios";
import {IEmailing} from "../models/IEmailing";
import $api from "../http";

export default class EmailingService {
  static async makeEmailing(name: string, emailListId: string, emailTemplateId: string): Promise<AxiosResponse<IEmailing>> {
    return $api.post('/emailing', {name, emailListId, emailTemplateId})
  }

  static async updateEmailing(id: string,
                              name?: string,
                              emailListId?: string,
                              emailTemplateId?: string,
                              ): Promise<AxiosResponse<IEmailing>> {
    return $api.put('/emailing/' + id, {name, emailListId, emailTemplateId})
  }

  static async deleteEmailing(id: string): Promise<void> {
    return $api.delete('/emailing/' + id)
  }

  static async getEmailing(id: string): Promise<AxiosResponse<IEmailing>> {
    return $api.get('/emailing/' + id)
  }

  static async getEmailings(): Promise<AxiosResponse<IEmailing[]>> {
    return $api.get('/emailings')
  }

  static async startEmailing(id: string): Promise<AxiosResponse<IEmailing>> {
    return $api.post('/emailing/' + id)
  }
}