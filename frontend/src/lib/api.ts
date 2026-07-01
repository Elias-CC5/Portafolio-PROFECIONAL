const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}

export async function sendContactMessage(payload: ContactPayload): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch {
    return { success: false, message: 'No se pudo conectar con el servidor. Intenta de nuevo más tarde.' };
  }
}
