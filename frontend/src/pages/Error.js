import { useRouteError } from "react-router";


function ErrorPage(){
const error = useRouteError()

let title = "An Error has occured";
let message ="something went wrong"

if(error.status===500){
  message = JSON.parse(error.data).message
}
 if(error.status ===404){
  title = "Not Found"
  message="Count not find resource or page"
 }

return (<>
<p>{title}</p>
<h1>{message}</h1>

</>

)

}


export default ErrorPage;