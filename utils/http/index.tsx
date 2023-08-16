import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
} from "axios";

export interface HttpConfig {
  onExpiredToken?: (originalRequest: any) => void;
}

export type HttpRequestConfig = AxiosRequestConfig & {
  method?: "get" | "post" | "put" | "delete" | "patch";
  url: string;
  data?: any;
};

export type HttpResponse<T = any> = AxiosResponse<T>;

export type HeaderProperties = HeadersDefaults & {
  Authorization?: string;
};

export interface RequestCallback {
  onError?: null | ((error: AxiosError) => void);
  onSuccess?: null | ((res: AxiosResponse) => void);
}

export class Http {
  private readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
        Connection: "keep-alive",
        DNT: 1,
        Host: "dev3.dansmultipro.co.id",
      },
    });
  }

  public async request(
    config: HttpRequestConfig,
    { onSuccess = null, onError = null }: RequestCallback = {}
  ) {
    try {
      const axiosConfig: any = {
        method: config.method,
        url: config.url,
      };
      if (config.data) {
        axiosConfig.data = config.data;
      }
      const response = await this.instance(axiosConfig);

      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (err: unknown) {
      if (onError && err instanceof AxiosError) {
        onError(err);
      }

      throw err;
    }
  }

  public async post(
    url: string,
    data: any,
    { onSuccess = null, onError = null }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "post",
      },
      { onSuccess, onError }
    );
  }

  public async put(
    url: string,
    data: any,
    { onSuccess = null, onError = null }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "put",
      },
      { onSuccess, onError }
    );
  }

  public async patch(
    url: string,
    data: any,
    { onSuccess = null, onError = null }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "patch",
      },
      { onSuccess, onError }
    );
  }

  public async remove(
    url: string,
    { onSuccess = null, onError = null }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        method: "delete",
      },
      { onSuccess, onError }
    );
  }

  public async get(
    url: string,
    { onSuccess = null, onError = null }: RequestCallback = {}
  ) {
    return this.request(
      {
        url: url,
        method: "get",
      },
      { onSuccess, onError }
    );
  }
}

export default new Http();
