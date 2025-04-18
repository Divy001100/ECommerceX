
import { redirect } from 'react-router'
import SignUpForm from '../../components/User/SingupForm'


function SignUpPage(){


    return ( <SignUpForm/>

    )
}

export default SignUpPage





export async function action({request}){

    const data = await request.formData()
      const userData = {
        name:data.get('name'),
        email:data.get('email'),
        password:data.get('password'),
        passwordConfirm:data.get('passwordConfirm')
      }


    const response = await fetch(`/api/v1/users/signUp`,{

        method:"POST",
        headers:{
             "Content-Type": "application/json"
        },
        body:JSON.stringify(userData)
    });
    const resData = await response.json();
    if (!response.ok || response.status !== 201) {
      
        throw new Response(JSON.stringify({
          message: resData.message || "Signup failed"
        }), {
          status: resData.status ||500
        });
      }

      
       localStorage.setItem("token", resData.token)
      
      console.log(resData.token)
      return redirect('/products')


}