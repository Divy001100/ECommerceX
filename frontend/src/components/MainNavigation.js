import { Link } from "react-router-dom"
import { NavLink,useNavigation } from "react-router-dom"



export default function MainNavigation(){
    const navigation =useNavigation()
    
return(
    <nav className="bg-gray-600 p-2 flex justify-center ">
        <ul className="flex flex-row gap-4 text-yellow-300">
            <li >
             <NavLink to = '/' 
             className={({isActive})=>isActive?"text-decoration-line: underline text-yellow-600":undefined }
             >Visit our Homepage </NavLink>
            </li>
            <li>
                <NavLink to='products'
                className={({isActive})=>isActive?"text-decoration-line: underline text-yellow-600":undefined}
                >View our products</NavLink>
            </li>
            {navigation.state ==='loading'&&<p>Loading...</p>}
        </ul>
    </nav>
)
}