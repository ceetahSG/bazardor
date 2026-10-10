const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
] as const;

export async function fetchBazarDor(
  endpoint: string,
  options?: RequestInit,
): Promise<Response> {
  const errors: Error[] = [];

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);

      if (response.ok) {
        return response;
      }

      errors.push(
        new Error(
          `${baseUrl}${endpoint} responded with ${response.status} ${response.statusText}`,
        ),
      );
    } catch (error) {
      errors.push(
        error instanceof Error
          ? error
          : new Error(`Request to ${baseUrl}${endpoint} failed`),
      );
    }
  }

  throw new Error(
    `All Bazar Dor API endpoints failed: ${errors
      .map((error) => error.message)
      .join("; ")}`,
  );
}
