import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error); // Good for debugging

  let title = "An Error Occurred";
  let message = "Something went wrong";

  // Handle Response errors
  if (error.status === 500) {
    try {
      message = error.data?.message || JSON.parse(error.data).message;
    } catch (e) {
      message = "Internal server error";
    }
  }
  
  if (error.status === 404) {
    title = "Not Found";
    message = "Could not find resource or page";
  }

  if (error.status === 400) {
    title = error.statusText || "Bad Request";
    try {
      message = error.data?.message || JSON.parse(error.data).message;
    } catch (e) {
      message = "Invalid request";
    }
  }

  
  if (error.status === 401) {
    title = error.statusText || "Bad Request";
    try {
      message = error.data?.message || JSON.parse(error.data).message;
    } catch (e) {
      message = "Invalid request please login to continue";
    }
  }

  // Handle Error objects (thrown directly)
  if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="error-page">
      <h1>{title}</h1>
      <p>{message}</p>
      {error.status && <p>Status code: {error.status}</p>}
    </div>
  );
}

export default ErrorPage;