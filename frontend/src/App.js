import { createBrowserRouter, RouterProvider} from 'react-router'
import RootLayout from './pages/Layout/RootLayout.js'
import HomePage from './pages/Home'
import ProductsPage,{loader as productsLoader} from './pages/Products/Products.js'
import ErrorPage from './pages/Error.js'
import ProductDetailsPage,{loader as productDetailLoader,
    action as ProductDeleteAction
} from "././pages/Products/ProductDetails.js"
import EditProductPage from './pages/Products/EditProductPage.js'
import NewProductPage from './pages/Products/NewProductPage.js'
import ProductLayout from './pages/Layout/ProductLayout.js'
import {action as EditAddAction} from './components/Product/ProductForm.js'
import SignUpPage,{action as signUpAction} from './pages/User/SignupPage.js'
import ViewMe from './components/User/ViewMe.js'
import MePage,{loader as UserMeLoader} from './pages/User/MePage.js'
import UserLayout from './pages/Layout/UserLayout.js'
import LoginPage,{action as LoginUserAction} from './pages/User/LoginPage.js'
import ForgotPassowrdPage,{action as forgotPasswordAction} from './pages/User/ForgotPasswordPage.js'
import ResetPasswordPage,{action as resetPasswordAction} from './pages/User/ResetPasswordPage.js'
import UpdatePasswordPage,{action as updatePasswordAction} from './pages/User/UpdatePasswordPage.js'
import UpdateMe,{action as updateMeAction}from './pages/User/UpdateMePage.js'
import DeleteMePage,{action as deleteMeAction} from './pages/User/DeleteMePage.js'
import EditReviewPage,{action as editReviewAction}from './pages/Reviews/EditReviewPage.js'
import AddReviewPage,{action as AddReviewAction}from './pages/Reviews/AddReviewPage.js'
import CheckoutPage,{loader as checkoutLoader} from './pages/Products/Order/CheckoutPage.js'
import MyOrdersPage,{loader as myOrdersLoader} from './pages/Products/Order/MyOrdersPage.js'
import OrderDetailsPage,{loader as orderDetailsLoader } from './pages/Products/Order/OrderDetailPage.js'
import TopDealsPage, {loader as topDealsLoader} from './pages/Products/TopDealsPage.js'
import AdminProductStatsPage,{loader as statsLoader}from './pages/Products/Admin/AdminProductStatsPage.js'
import AdminDashboardPage,{loader as adminDashboardLoader} from './pages/Products/Admin/AdminDashBoardPage.js'
import AdminDashboardPreview from './pages/Products/Admin/AdminDashboardPreview.js'




const router = createBrowserRouter([


    {
        path:'/',
        element:<RootLayout/>,
        errorElement:<ErrorPage/>,
        children:[
            {index:true, 
            element:<HomePage/>},
          
        {path:'users',
        //  element:<UserLayout/>,
            children:[
                {path:'signUp', 
                    element:<SignUpPage/>,
                    action:signUpAction},
                    {path:'me',
                    element:<MePage/>,
                    loader:UserMeLoader
                    },
                    {path:'login',element:<LoginPage/>,
                    action:LoginUserAction
                     },
                     {path:'ForgotPassword', element:<ForgotPassowrdPage/>,
                        action:forgotPasswordAction
                     },
                     {path:'resetPassword/:token',
                      element:<ResetPasswordPage/>,
                      action:resetPasswordAction
                     },
                     {path:'updatePassword',element:<UpdatePasswordPage/>,
                        action:updatePasswordAction
                     },
                     {path:'updateMe',element:<UpdateMe/>,
                    action:updateMeAction
                     },{
                        path:'deleteMe', element:<DeleteMePage/>,
                        action:deleteMeAction
                     }

            ]
        },
           
            {path:'products',
            // element:<ProductLayout/>,
            
             children:[
            {index:true,
             element:<ProductsPage/>,
             loader:productsLoader,
           
            },
            {path:'new', 
            element:<NewProductPage/>,
             action:EditAddAction},
            {path:':productId',
            id:'product-detail',
            loader:productDetailLoader,
                children:[
                    {index:true, element:<ProductDetailsPage/>,
                    action:ProductDeleteAction},
                    {path:'edit', element: <EditProductPage/>,
                      action:  EditAddAction
                    },
                    {path:'reviews',element:<AddReviewPage/>,
                    action:AddReviewAction
                    },
                    {path:'reviews/:reviewId',element:<EditReviewPage/>,
                    action:editReviewAction,
                    
                     }
                ]
                }
        
        ]},
           {path:'/order/checkout-session/:productId',element:<CheckoutPage/>,
           loader:checkoutLoader
           },
           {
            path: 'myorders',
            element: <MyOrdersPage />,
            loader: myOrdersLoader
          },
          {
            path: 'orders/:orderId',
            element: <OrderDetailsPage />,
            loader: orderDetailsLoader
          },
          
          {
            path: "/top-deals",
            element: <TopDealsPage />,
            loader: topDealsLoader,
          },
          
          
          {
            path:"/admin/product-stats",
          element:<AdminProductStatsPage />,
          loader:statsLoader
        },
        {
          path: "/admin/preview-dashboard",
          element: <AdminProductStatsPage />,
          loader: statsLoader,
        },
        {
          path: "/admin/dashboard",
          element: <AdminDashboardPage />, // your new control center component
          loader: adminDashboardLoader // loads all users, products, reviews
        },
        {
          path: "/admin/preview-control-panel",
          element: <AdminDashboardPreview />,
          loader: adminDashboardLoader
        }
        
        


          
        
            
        ],
    }
])





export default function App(){
   



    return (
    
     <RouterProvider router={router}/>




    )
}