import { NavLink, useNavigation,useNavigate } from "react-router-dom";

export default function MainNavigation() {
  const navigation = useNavigation();
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const isAdminOrSeller = user?.role === "admin" || user?.role === "seller";

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left: Product Navigation */}
      <ul className="flex gap-6 text-sm font-medium text-gray-700">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 underline" : "hover:text-blue-600"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-blue-600 underline" : "hover:text-blue-600"
            }
          >
            All Products
          </NavLink>
        </li>
        {user?.role === "admin" && (
              <li>
                <NavLink
                  to="/admin/product-stats"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                  }
                >
                  Product Stats
                </NavLink>
              </li>
            )}

              {user?.role === "admin" && (
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                      isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                    }
                  >
                   Admin Pannel
                  </NavLink>
                </li>
              )}

        {isAdminOrSeller && (
          <li>
            <NavLink
              to="/products/new"
              className={({ isActive }) =>
                isActive ? "text-blue-600 underline" : "hover:text-blue-600"
              }
            >
              Add Product
            </NavLink>
          </li>
        )}
      </ul>

      {/* Right: User Navigation */}
      <ul className="flex gap-6 text-sm font-medium text-gray-700">
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/users/signUp"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                }
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                }
              >
                Login
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/users/me"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                }
              >
                Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users/updateMe"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                }
              >
                Update Me
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users/deleteMe"
                className={({ isActive }) =>
                  isActive ? "text-red-600 underline" : "hover:text-red-600"
                }
              >
                Delete Me
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/users/forgotPassword"
            className={({ isActive }) =>
              isActive ? "text-blue-600 underline" : "hover:text-blue-600"
            }
          >
            Forgot Password
          </NavLink>
        </li>

        {isLoggedIn && (
        <li>
        <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate('/products')
        }}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
      </li>
        )}
        
            
  



        
      </ul>

      {/* Optional loading indicator */}
      {navigation.state === "loading" && (
        <span className="absolute top-0 right-4 text-blue-500 text-xs">
          Loading...
        </span>
      )}
    </nav>
  );
}
