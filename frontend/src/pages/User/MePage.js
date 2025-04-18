import ViewMe from "../../components/User/ViewMe"
import { useLoaderData } from "react-router"
import { apiFetch } from "../../api"
function MePage(){
const user = useLoaderData()
    return(
        <ViewMe user= {user}/>
    )
}

export default MePage





export async function loader(){
    const token = localStorage.getItem('token')
    const response = await apiFetch (`/api/v1/users/me`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        }
       
    })
    const resData = await response.json()
    if (!response.ok) {
        console.log(resData)
        throw new Response("Failed to load user", { status: 401 });
      }
      
    
    localStorage.setItem('user',JSON.stringify(resData.data.doc))


    console.log(resData.data.doc)
    return resData.data.doc

 
}
