import { createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './pages/RootLayout'
import HomePage from './pages/Home'
import ProductsPage,{loader as productsLoader} from './pages/Products/Products.js'
import ErrorPage from './pages/Error.js'
import ProductDetailsPage,{loader as productDetailLoader} from "././pages/Products/ProductDetails.js"
import EditProductPage from './pages/Products/EditProductPage.js'
import NewProductPage,{action as newProductAction} from './pages/Products/NewProductPage.js'
import ProductLayout from './pages/Products/ProductLayout.js'

const router = createBrowserRouter([


    {
        path:'/',
        element:<RootLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {index:true, 
            element:<HomePage/>},
            {path:'products',
            
            element:<ProductLayout/>,
            
             children:[
            {index:true,
             element:<ProductsPage/>,
             loader:productsLoader,
           
            },
            {path:'new', 
            element:<NewProductPage/>,
             action:newProductAction},
            {path:':productId',
            id:'product-detail',
            loader:productDetailLoader,
                children:[
                    {index:true, element:<ProductDetailsPage/>
                     
                    },
                    {path:'edit', element: <EditProductPage/>}
                ]
                }
        
        ]},
           
           
            
        ],
    }
])





export default function App(){
   



    return (
    
     <RouterProvider router={router}/>




    )
}