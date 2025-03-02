import { jwtDecode } from 'jwt-decode';

export function isTokenValid(token: string): boolean {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}
