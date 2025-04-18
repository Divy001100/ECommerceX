const baseURL = process.env.REACT_APP_API_URL;

export function apiFetch(path, options = {}) {
  return fetch(`${baseURL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    credentials: "include", // only if you use cookies
  });
}
