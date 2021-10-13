import {IUser} from "../api/models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../api/services/auth.service";
import axios from "axios";
import {AuthResponse} from "../api/models/response/Auth.response";
import {API_URL} from "../api/http";
import {useState} from "react";

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false


  constructor() {
    makeAutoObservable(this)
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password)
      await console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password)
      await console.log(response)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    }
  }

  async checkAuth() {
    this.setLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e: any) {
      console.log(e.response?.data?.message)
    } finally {
      this.setLoading(false)
    }
  }
}