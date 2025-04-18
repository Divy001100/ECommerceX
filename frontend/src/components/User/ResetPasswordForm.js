import { Form, useActionData, useNavigation } from "react-router-dom";

export default function ResetPasswordForm() {

  const navigation = useNavigation();



  return (
    
    <div className="animate-slide-down bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto">
      <Form method="post" className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          
          

        
       

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           {/* Password */}
           <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-800">passwordConfirm</label>
            <input
              type="password"
              name="passwordConfirm"
              required
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition font-semibold text-sm shadow-md"
            >
              {navigation.state === "submitting" ? "LOGGING IN..." : "Log In"}
            </button>
          </div>

          {/* Error Message */}
          {/* {errors && (
            <div className="text-red-600 text-sm font-semibold text-center">
              {errors.message || "Something went wrong."}
            </div>
          )} */}
        </div>
      </Form>
    </div>
  );
}
