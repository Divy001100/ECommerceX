
import { redirect } from 'react-router';
import ResetPasswordForm from '../../components/User/ResetPasswordForm'

function ResetPasswordPage(){

    return(
        <ResetPasswordForm/>
    )
}

export default ResetPasswordPage;

export async function action ({request,params}){
  const data =await request.formData()
  const passwordData ={
    password:data.get("password"),
    passwordConfirm:data.get("passwordConfirm")
  }

  const resetToken = params.token
    const response = await fetch(`/api/v1/users/resetPassword/${resetToken}`,{
method:"PATCH",
headers:{
    "Content-Type":"application/json"
},
body:JSON.stringify(passwordData)

    })
    const resData = await response.json()
if(!response.ok){
    throw new Response({message:resData.message},{
        status:resData.status || 500
    })
}
localStorage.setItem('token', resData.token)


return redirect('/users/me')
}

