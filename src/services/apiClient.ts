const TOKEN_KEY = 'nps_admin_token';
const USER_KEY = 'nps_admin_user';

export const apiClient = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getUser(): any | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  setUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data: T | null; error: string | null }> {
    try {
      const headers = new Headers(options.headers || {});
      
      // Set content type for JSON if not multipart/FormData
      if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }

      // Add auth token if available
      const token = this.getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      const res = await fetch(endpoint, {
        ...options,
        headers,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return {
          data: null,
          error: data?.error || data?.message || `Request failed with status ${res.status}`,
        };
      }

      return { data, error: null };
    } catch (err: any) {
      console.error(`API Error on ${endpoint}:`, err);
      return { data: null, error: err.message || 'Network connection failed' };
    }
  },
};
