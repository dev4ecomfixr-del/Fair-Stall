export async function apiCall<T>(
  endpoint: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(endpoint, init);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

