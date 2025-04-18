const baseURL = process.env.REACT_APP_API_URL;
console.log("📦 baseURL is:", baseURL);

export function apiFetch(path, options = {}) {
  return fetch(`${baseURL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });
}
