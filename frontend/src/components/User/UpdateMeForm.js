import { Form, useNavigation } from "react-router";

function UpdateMeForm() {
  const navigation = useNavigation();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="animate-fade-in-up bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl rounded-3xl px-10 py-12 w-full max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-10">
        Update Your Information
      </h2>
      <Form method="post" className="space-y-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-800 tracking-wide uppercase">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              className="border-2 border-gray-300 rounded-xl px-5 py-3 text-base text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              defaultValue={user?.name}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-800 tracking-wide uppercase">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="border-2 border-gray-300 rounded-xl px-5 py-3 text-base text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              defaultValue={user?.email}
            />
          </div>

          {/* Picture */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-800 tracking-wide uppercase">Photo URL</label>
            <input
              type="url"
              name="photo"
              required
              placeholder="example.jpg"
              className="border-2 border-gray-300 rounded-xl px-5 py-3 text-base text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              defaultValue={user?.photo}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-blue-500 to-black-500 text-white py-3 px-6 rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-all duration-300"
            >
              {navigation.state === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default UpdateMeForm;











// import { Form ,useNavigation} from "react-router"

// function UpdateMeForm(){
// const navigation = useNavigation()
// const user = JSON.parse(localStorage.getItem('user'))

//     return (<div className="animate-slide-down bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto">
//         <Form method="post" className="space-y-6">
//           <div className="grid grid-cols-1 gap-6">
//             {/* Name */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-semibold text-gray-800">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 placeholder="John Doe"
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 defaultValue={user?.name}
//               />
//             </div>
  
//             {/* Email */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-semibold text-gray-800">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 placeholder="you@example.com"
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 defaultValue={user?.email}
//              />
//             </div>
//              {/* picture */}
//              <div className="flex flex-col">
//               <label className="mb-1 text-sm font-semibold text-gray-800">photo</label>
//               <input
//                 type="url"
//                 name="photo"
//                 required
//                 placeholder="example.jpg"
//                 className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 defaultValue={user?.photo}
              
//               />
//             </div>
//              {/* Submit Button */}
//              <div className="pt-2">
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition font-semibold text-sm shadow-md"
//               >
//                 {navigation.state === "submitting" ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//             </div>
//             </Form>
//             </div>
//     )
// }

// export default UpdateMeForm;