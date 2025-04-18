import { useState } from "react";
import { useNavigate,redirect } from "react-router-dom"; // This is still required for client-side redirection

function DeleteMePage() {
    const navigate = useNavigate(); // Use navigate for client-side redirection
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = async () => {
        const userConfirmed = window.confirm("Are you sure you want to delete your account?");
        if (!userConfirmed) {
            return; // If user cancels, do nothing
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert("You are not logged in.");
            return;
        }

        try {
            const response = await fetch(`/api/v1/users/deleteMe`, {
                method: "PATCH", // Deactivating the account
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 204) {
                const resData = await response.json();
                throw new Error(resData.message || "Something went wrong");
            }

            // Remove user data from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Set deleted status to true to display "Account Deleted"
            setIsDeleted(true);

            // Redirect to /products after successful account deletion
            navigate('/products'); // This will perform the client-side redirection

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            {isDeleted ? (
                <div>Your Account has been deleted.</div>
            ) : (
                <div>
                    <button onClick={handleDelete}>Delete Account</button>
                </div>
            )}
        </div>
    );
}

export default DeleteMePage;

export async function action({ request }) {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Response("Unauthorized", { status: 401 });
    }

    const response = await fetch(`/api/v1/users/deleteMe`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status !== 204) {
        const resData = await response.json();
        throw new Response(
            JSON.stringify({
                message: resData.message || "Something went wrong",
            }),
            {
                status: response.status || 400,
            }
        );
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // This part should work correctly on the server-side, but it won't work on the frontend
    return redirect('/products'); // This should be handled via `navigate()` in frontend, not `redirect()`
}
