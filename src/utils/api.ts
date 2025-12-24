import { Todo } from '@/types/todo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json() as Promise<T>;
}

export const todoAPI = {
  // GET /api/todos - 全Todo取得
  getAll: async (): Promise<Todo[]> => {
    return fetchAPI<Todo[]>('/todos');
  },

  // POST /api/todos - Todo追加
  create: async (text: string): Promise<Todo> => {
    return fetchAPI<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },

  // PUT /api/todos/:id - Todo更新
  update: async (id: number, updates: Partial<Pick<Todo, 'text' | 'completed'>>): Promise<Todo> => {
    return fetchAPI<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // DELETE /api/todos/:id - Todo削除
  delete: async (id: number): Promise<void> => {
    return fetchAPI<void>(`/todos/${id}`, {
      method: 'DELETE',
    });
  },
};

