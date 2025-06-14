import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config/env';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // You can add auth headers here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle errors globally
        return Promise.reject(error);
      }
    );
  }


  // Vehicle endpoints
  public async getVehicles(): Promise<AxiosResponse> {
    return this.client.get('/vehicles');
  }

  public async getVehicleById(id: string): Promise<AxiosResponse> {
    return this.client.get(`/vehicles/${id}`);
  }

  // Content generation endpoints
  public async generateContent(vehicleId: string): Promise<AxiosResponse> {
    return this.client.get(`/content/vehicles/${vehicleId}`);
  }

  public async generateEmailContent(vehicleId: string, templateType: string): Promise<AxiosResponse> {
    return this.client.post(`/content/vehicles/${vehicleId}/email`, { templateType });
  }
}

export const api = new ApiClient();
