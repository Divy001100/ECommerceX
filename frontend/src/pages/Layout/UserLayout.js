import { Outlet } from "react-router";
import UserNavigation from "../../components/Navigation/UserNavigation";


function UserLayout(){

    return(<>
    <UserNavigation/>
    <main>
        <Outlet/>
    </main>
    </>)
}

export default UserLayout