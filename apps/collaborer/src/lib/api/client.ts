const BASE_URL =
  import.meta.env.PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

// For the rare case a caller needs a direct URL rather than a fetch — e.g. an
// <a href> download link, where the browser's own navigation (not our fetch
// wrapper) needs to hit the API and carry the session cookie along with it.
export function apiUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

export interface ApiErrorDetail {
  path: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: ApiErrorDetail[];

  constructor(
    status: number,
    code: string,
    message: string,
    details?: ApiErrorDetail[]
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationMeta;
}

// The backend always returns { data: ... } or { data: ..., pagination: ... } —
// callers destructure what they need rather than this wrapper guessing the shape.
export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;
  // FormData (file uploads) must NOT be JSON-stringified, and the browser sets
  // its own multipart Content-Type (with the boundary) — never set it manually.
  const isFormData =
    typeof FormData !== 'undefined' && body instanceof FormData;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    // The session lives in an httpOnly cookie set by the API on a different
    // origin in dev — this is what makes it round-trip on every request.
    credentials: 'include',
    headers: {
      ...(body !== undefined && !isFormData
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...headers
    },
    body:
      body === undefined
        ? undefined
        : isFormData
        ? (body as FormData)
        : JSON.stringify(body)
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');
  const payload = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const error = payload?.error;
    throw new ApiError(
      response.status,
      error?.code ?? 'UNKNOWN_ERROR',
      error?.message ?? 'Something went wrong. Please try again.',
      error?.details
    );
  }

  return payload as T;
}
