import { Outlet,useNavigation } from "react-router";
import MainNavigation from "../../components/Navigation/MainNavigation"

export default function RootLayout(){
const navigation = useNavigation()


    return(
        <>
        <MainNavigation/>
     
       
        <main>
        {navigation.state ==='loading' && <p>Loading...</p>}        
        <Outlet/>
        </main>
        
        </>
    )
}