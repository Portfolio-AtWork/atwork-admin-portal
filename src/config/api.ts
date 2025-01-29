export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL, // You can change this to your actual API base URL
} as const;

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};

export enum NotificationKind {
  Success = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
}

export interface Notification {
  id: string; // Guid equivalente a string no TS
  message: string;
  kind: NotificationKind;
  parameters: unknown; // Tipo genérico para representar parâmetros adicionais
}

export interface ObjectResponse<T> {
  value: T;
  notifications: Notification[];
  ok: boolean; // Determinado pela lógica em tempo de execução
}

export async function post<TRequest, TResponse>(
  endpoint: string,
  values?: TRequest,
): Promise<ObjectResponse<TResponse>> {
  try {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
      body: JSON.stringify(values),
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData: ObjectResponse<TResponse> = await response.json();
      throw errorData;
    }

    const data: ObjectResponse<TResponse> = await response.json();
    return data;
  } catch (error) {
    console.error('Error during POST request:', error);
    throw error as ObjectResponse<TResponse>;
  }
}

export async function put<TRequest, TResponse>(
  endpoint: string,
  values?: TRequest,
): Promise<ObjectResponse<TResponse>> {
  try {
    const url = buildApiUrl(endpoint);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
      body: JSON.stringify(values),
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData: ObjectResponse<TResponse> = await response.json();
      throw errorData;
    }

    const data: ObjectResponse<TResponse> = await response.json();
    return data;
  } catch (error) {
    console.error('Error during PUT request:', error);
    throw error as ObjectResponse<TResponse>;
  }
}

export async function get<TRequest, TResponse>(
  endpoint: string,
  values?: TRequest,
): Promise<ObjectResponse<TResponse>> {
  try {
    const url = new URL(buildApiUrl(endpoint));
    const searchParams = new URLSearchParams(values as never);
    url.search = searchParams.toString();

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
    });

    if (!response.ok) {
      const errorData: ObjectResponse<TResponse> = await response.json();
      throw errorData;
    }

    const data: ObjectResponse<TResponse> = await response.json();
    return data;
  } catch (error) {
    console.error('Error during GET request:', error);
    throw error as ObjectResponse<TResponse>;
  }
}

export async function _delete<TRequest, TResponse>(
  endpoint: string,
  values?: TRequest,
): Promise<ObjectResponse<TResponse>> {
  try {
    const url = new URL(buildApiUrl(endpoint));
    const searchParams = new URLSearchParams(values as never);
    url.search = searchParams.toString();

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') as string}`,
      },
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData: ObjectResponse<TResponse> = await response.json();
      throw errorData;
    }

    const data: ObjectResponse<TResponse> = await response.json();
    return data;
  } catch (error) {
    console.error('Error during DELETE request:', error);
    throw error as ObjectResponse<TResponse>;
  }
}

export default { post, put, get, delete: _delete };
