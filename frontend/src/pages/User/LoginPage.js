import { redirect } from "react-router"
import LoginForm from "../../components/User/LoginForm.js"



function LoginPage(){


    return(<LoginForm/>)
}

export default LoginPage


export async function action({ request }) {
    const data = await request.formData();
    const userData = {
      email: data.get("email"),
      password: data.get("password")
    };
  
    const response = await fetch(`/api/v1/users/logIn`, {
      method: "POST", // ✅ REQUIRED
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData) // ✅ MUST BE STRINGIFIED
    });
  
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: resData.message || "Login failed" }),
        {
          status: resData.error?.statusCode || 500
        }
      );
    }
  
    localStorage.setItem("token", resData.token);
    localStorage.setItem("user", JSON.stringify(resData.data.user));
  
    return redirect("/users/me");
  }
  