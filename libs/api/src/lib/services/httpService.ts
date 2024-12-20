import { serialize } from '@digital-wolf/fns';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const BASE_API = process.env.API_URL;

// TODO: Create functions for the rest of the methods
export const $http = {
  get: async function <T = any>(url: string, config?: RequestConfig) {
    const { useFormData, headers, token, baseUrl, ...restConfig } = config ?? {};
    const compHeaders = {
      ...(headers || {}),
      ...(token && { Authorisation: `Bearer ${token}` }),
    };
    try {
      const res = await fetch(`${baseUrl ?? BASE_API}${url}`, { ...restConfig, headers: compHeaders });
      const data = await res.json();
      return { data: data as T };
    } catch (e: any) {
      return Promise.reject(e?.message);
    }
  },
  post: async function <T = any>(url: string, body: Record<string, any>, config?: RequestConfig): Promise<ApiResponse<T>> {
    const { useFormData, headers, token, baseUrl, ...restConfig } = config ?? {};
    const compHeaders = {
      ...(headers || {}),
      ...(token && { Authorization: `Bearer ${token}` }),
    };
    const reqBody = useFormData ? serialize(body) : JSON.stringify(body);
    const res = await fetch(`${baseUrl ?? BASE_API}${url}`, { method: 'POST', ...(restConfig ?? {}), headers: compHeaders, body: reqBody });
    return await res.json();
  },
  delete: async function <T = any>(url: string, config?: RequestConfig) {
    const { useFormData, headers, token, baseUrl, ...restConfig } = config ?? {};
    const compHeaders = {
      ...(headers || {}),
      ...(token && { Authorisation: `Bearer ${token}` }),
    };
    try {
      const res = await fetch(`${baseUrl ?? BASE_API}${url}`, { ...restConfig, headers: compHeaders });
      const data = await res.json();
      return { data: data as T };
    } catch (e: any) {
      return Promise.reject(e?.message);
    }
  },
};

export interface RequestConfig extends RequestInit {
  baseUrl?: string;
  token?: string;
  useFormData?: boolean;
}

export interface ApiResponseBody<T> {
  message: string;
  data: T;
  success: boolean;
}

export interface ApiSuccessResponseBody<T> {
  message?: string;
  data: T;
  success: true;
}

export interface ApiErrorResponseBody<T> {
  message: T;
  success: false;
}

export interface ApiErrorMessage {
  field: string;
  message: string;
}

export type ApiResponse<T, K = string> = ApiSuccessResponseBody<T> | ApiErrorResponseBody<K>;

export type ApiServerResponse<T> = Promise<NextResponse<ApiResponse<T>>>;
