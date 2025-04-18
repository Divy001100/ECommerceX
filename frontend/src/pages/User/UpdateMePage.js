import { redirect } from "react-router";
import UpdateMeForm from "../../components/User/UpdateMeForm";
import { useLoaderData } from "react-router";
import { apiFetch } from "../../api";

function UpdateMe() {
    const user = useLoaderData()

    console.log(user)
    return <UpdateMeForm />;
}

export async function action({ request }) {
    const token = localStorage.getItem('token');
    

    if (!token) {
        // Handle the case where the token is missing (e.g., redirect to login)
        throw new Response("Unauthorized", { status: 401 });
    }

    const data = await request.formData();
    const userUpdateData = {
        name: data.get('name'),
        email: data.get('email'),
        photo: data.get('photo')
    };

    const response = await apiFetch(`/api/v1/users/updateMe`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userUpdateData)
    });

    if (!response.ok) {
        // This ensures we only try to parse the response if the request was successful
        const resData = await response.json();
        throw new Response(
            JSON.stringify({
                message: resData.message || "Something went wrong",
            }),
            {
                status: response.status || 401,
            }
        );
    }
    const resData = await response.json()
   
    return redirect('/users/me');
    
  
}

export default UpdateMe;
