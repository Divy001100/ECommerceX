import { redirect } from "react-router"
import UpdatePasswordForm from "../../components/User/updatePasswordForm"
import { apiFetch } from "../../api"

function UpdatePasswordPage(){
    const token = localStorage.getItem('token')
    console.log("token is...",token)
    return(
        <UpdatePasswordForm/>
    )

}

export async function action({request}){
  const token = localStorage.getItem('token')
  console.log("token is...",token)
  const data = await request.formData()
  const passwordData = {
    currentPassword:data.get("currentPassword"),
    password:data.get("password"),
    passwordConfirm:data.get("passwordConfirm")
  }

    const response = await apiFetch(`/api/v1/users/updateMyPassword`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(passwordData)
        
    })
    const resData = await response.json()
    if(!response.ok){
        console.log(resData.message)
        throw new Response(
            JSON.stringify({
              message: resData.message || "Something went wrong",
            }),
            {
              status: 401,
            }
          );
          
    }
    localStorage.setItem('token',resData.token)
   return  redirect('/users/me')


}

export default UpdatePasswordPage