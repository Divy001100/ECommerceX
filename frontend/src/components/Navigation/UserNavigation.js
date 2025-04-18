import { Link } from "react-router-dom";

function UserNavigation() {
  const user = JSON.parse(localStorage.getItem("user")); // safely parse
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="flex justify-between items-center p-4 shadow bg-white">
      <h1 className="text-xl font-bold">🛒 EcommerceX</h1>
      
      <ul className="flex gap-6">
        <li><Link to="/products">Products</Link></li>

        {!isLoggedIn && (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/forgot-password">Forgot Password</Link></li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li><Link to="/me">My Profile</Link></li>
            <li><Link to="/update-me">Update Info</Link></li>
            <li><Link to="/delete-me">Delete Account</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login"; // redirect
            }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default UserNavigation;
