/**
 * REST API Client for Spring Boot Virtual Lab Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; message?: string; data: T }> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('vlab_auth_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || 'API request failed');
    }

    return json;
  } catch (err: any) {
    console.warn(`[API Call ${endpoint}] Backend offline or failed:`, err.message);
    throw err;
  }
}

// Dedicated API service methods
export const api = {
  auth: {
    login: (body: { email: string; password: string }) =>
      fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    register: (body: any) =>
      fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    me: () => fetchApi('/auth/me'),
  },
  labs: {
    getAll: (category?: string) =>
      fetchApi(`/labs${category ? `?category=${category}` : ''}`),
    getBySlug: (slug: string) => fetchApi(`/labs/${slug}`),
  },
  experiments: {
    getAll: (labSlug?: string) =>
      fetchApi(`/experiments${labSlug ? `?labSlug=${labSlug}` : ''}`),
    getBySlug: (slug: string) => fetchApi(`/experiments/${slug}`),
  },
  quizzes: {
    getByExperiment: (slug: string) => fetchApi(`/quizzes/experiment/${slug}`),
    submit: (quizId: number, answers: Record<number, number>) =>
      fetchApi(`/quizzes/${quizId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers }),
      }),
    myAttempts: () => fetchApi('/quizzes/my-attempts'),
  },
  progress: {
    getMyProgress: () => fetchApi('/progress'),
    update: (slug: string, body: any) =>
      fetchApi(`/progress/experiments/${slug}`, {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
  announcements: {
    getAll: (category?: string) =>
      fetchApi(`/announcements${category ? `?category=${category}` : ''}`),
  },
  feedback: {
    submit: (body: any) =>
      fetchApi('/feedback', { method: 'POST', body: JSON.stringify(body) }),
  },
};
