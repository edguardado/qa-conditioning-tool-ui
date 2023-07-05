import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiHelper {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: 'https://api.example.com',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private handleErrorResponse<T>(error: AxiosError): Promise<T> {
    let errorMessage = 'An error occurred';
    if (error.response) {
      // Server-side error
      errorMessage = `Error Code: ${error.response.status}\nMessage: ${error.response.data}`;
    } else if (error.request) {
      // Request made, but no response received
      errorMessage = 'No response received from the server';
    } else {
      // Something went wrong while setting up the request
      errorMessage = error.message;
    }
    console.error(errorMessage);
    return Promise.reject(errorMessage);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.http.get<T>(url, config);
      return response.data;
    } catch (error: any) {
      return this.handleErrorResponse<T>(error);
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.http.post<T>(url, data, config);
      return response.data;
    } catch (error: any) {
      return this.handleErrorResponse<T>(error);
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.http.put<T>(url, data, config);
      return response.data;
    } catch (error:any) {
      return this.handleErrorResponse<T>(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.http.delete<T>(url, config);
      return response.data;
    } catch (error: any) {
      return this.handleErrorResponse<T>(error);
    }
  }
}
