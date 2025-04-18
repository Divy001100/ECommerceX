import { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/v1/users/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send email.");

      setMessage("✅ Please check your email for the reset link.");
    } catch (err) {
      setError("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-slide-down bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto space-y-6">
      <input
        type="email"
        name="email"
        placeholder="example@host.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 px-4 text-black py-2 rounded-md text-sm"
      />

      <button
        onClick={handleClick}
        className="w-full bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg hover:bg-blue-700 transition"
        type="button"
        disabled={loading}
      >
        {loading ? "Sending Reset Email..." : "Submit"}
      </button>

      {message && (
        <div className="text-green-600 text-sm text-center">{message}</div>
      )}

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}

      <div className="text-gray-500 text-sm text-center">Step 1 of 2</div>
    </div>
  );
}

export default ForgotPasswordPage;








// import { useState } from "react";
// import { redirect, useSubmit,useNavigation } from "react-router-dom";

// function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const submit = useSubmit();
//   const navigation = useNavigation()

//   const handleClick = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("email", email);
//     submit(formData, { method: "POST" });
//   };
//    // Detect when submission is done
//    useEffect(() => {
//     if (navigation.state === "idle") {
//       setShowSuccess(true);
//     }
//   }, [navigation.state]);

//   return (
//     <div className="animate-slide-down bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto space-y-6">
//       <input
//         type="email"
//         name="email"
//         placeholder="example@host.com"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm"
//       />
//       {(navigation.state==='')}
//       <button
//         onClick={handleClick}
//         className="w-full bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg hover:bg-blue-700 transition"
//         type="button"
//       >
//         Submit
//       </button>
      
//       <div className="text-gray-500 text-sm text-center">Step 1 of 2</div>
//     </div>
//   );
// }
export async function action({ request }) {
    const data = await request.formData(); // ✅ match the format
    const email = data.get("email");
  
    const response = await fetch(`/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  
    const resData = await response.json();
  
    if (!response.ok) {
      throw new Response(
        JSON.stringify({
          message: resData.message || "Attempt Failed, please try again",
        }),
        { status: 400 }
      );
    }
   
    const resetToken = resData.resetToken
    
    // return redirect(`/users/resetPassword/${resetToken}`);
    return null
  }
  






