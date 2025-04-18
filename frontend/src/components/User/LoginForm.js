import { Form, useActionData, useNavigation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function LoginForm() {
  const errors = useActionData();
  const navigation = useNavigation();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate()

  const handleclick = ()=>{
    navigate('/signUp')
  }

  // Floating particles background effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
      script.onload = () => {
        window.particlesJS("login-bg", {
          particles: {
            number: { value: 30, density: { enable: true, value_area: 800 } },
            color: { value: "#3b82f6" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" }
            }
          }
        });
      };
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated particle background */}
      <div id="login-bg" className="absolute inset-0 z-0" />

      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="relative z-10 w-full max-w-md px-8 py-12 bg-gradient-to-br from-white/90 via-green-50/95 to-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating highlight effect */}
        <motion.div
          animate={{
            x: isHovered ? [0, 10, -10, 0] : 0,
            y: isHovered ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-70 blur-md"
        />

        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Login to your account
          </motion.p>
        </div>

        <Form method="post" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <motion.input
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 1)"
              }}
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 shadow-sm focus:outline-none transition-all duration-200"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {isFocused && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <label className="block text-sm font-medium text-black mb-1">Password</label>
            <motion.input
              whileFocus={{ 
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 1)"
              }}
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3  text-black rounded-xl border border-gray-200 bg-white/90 shadow-sm focus:outline-none transition-all duration-200"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-200 text-white font-semibold shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {navigation.state === "submitting" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    LOGGING IN...
                  </>
                ) : (
                  "Log In"
                )}
              </span>
              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: isHovered ? "100%" : "-100%", opacity: 0.6 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-white/20"
                style={{ skewX: "-20deg" }}
              />
            </motion.button>
          </motion.div>
        </Form>

        <AnimatePresence>
          {errors && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-red-50/90 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center"
            >
              {errors.message || "Something went wrong."}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="mt-8 text-center text-sm text-gray-500 z-50 relative"
>
  Don't have an account?{" "}
  <Link
    to="/users/signup"
    className="text-blue-600 hover:underline font-medium cursor-pointer"
  >
    Sign up
  </Link>
</motion.div>

      </motion.div>
    </div>
  );
}
// latestdc
// import { Form, useActionData, useNavigation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";
// import LoginModal from "./LoginModal";

// export default function LoginForm() {
//   const errors = useActionData();
//   const navigation = useNavigation();
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   // Floating particles background effect
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const script = document.createElement("script");
//       script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
//       script.onload = () => {
//         window.particlesJS("login-bg", {
//           particles: {
//             number: { value: 30, density: { enable: true, value_area: 800 } },
//             color: { value: "#3b82f6" },
//             shape: { type: "circle" },
//             opacity: { value: 0.5, random: true },
//             size: { value: 3, random: true },
//             line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.4, width: 1 },
//             move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
//           },
//           interactivity: {
//             detect_on: "canvas",
//             events: {
//               onhover: { enable: true, mode: "repulse" },
//               onclick: { enable: true, mode: "push" }
//             }
//           }
//         });
//       };
//       document.body.appendChild(script);
//       return () => document.body.removeChild(script);
//     }
//   }, []);

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Animated particle background */}
      
      
//       <div id="login-bg" className="absolute inset-0 z-0" />

//       <motion.div
//         initial={{ opacity: 0, y: -50, scale: 0.95 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ type: "spring", damping: 10, stiffness: 100 }}
//         className="relative z-10 w-full max-w-md px-8 py-12 bg-gradient-to-br from-white/90 via-gray-50/95 to-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20"
//         style={{
//           boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Floating highlight effect */}
//         <motion.div
//           animate={{
//             x: isHovered ? [0, 10, -10, 0] : 0,
//             y: isHovered ? [0, -5, 5, 0] : 0,
//           }}
//           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-70 blur-md"
//         />

//         <div className="text-center mb-10">
//           <motion.h1 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-3xl font-bold text-gray-900 mb-2"
//           >
//             Welcome Back
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-gray-600"
//           >
//             Login to your account
//           </motion.p>
//         </div>

//         <Form method="post" className="space-y-6">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.3 }}
//             className="relative"
//           >
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <motion.input
//               whileFocus={{ 
//                 boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
//                 backgroundColor: "rgba(255, 255, 255, 1)"
//               }}
//               type="email"
//               name="email"
//               required
//               placeholder="you@example.com"
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 shadow-sm focus:outline-none transition-all duration-200"
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//             />
//             {isFocused && (
//               <motion.div
//                 initial={{ width: 0 }}
//                 animate={{ width: "100%" }}
//                 transition={{ duration: 0.3 }}
//                 className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
//               />
//             )}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4 }}
//             className="relative"
//           >
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <motion.input
//               whileFocus={{ 
//                 boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
//                 backgroundColor: "rgba(255, 255, 255, 1)"
//               }}
//               type="password"
//               name="password"
//               required
//               placeholder="••••••••"
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 shadow-sm focus:outline-none transition-all duration-200"
//             />
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: "100%" }}
//               transition={{ duration: 0.3, delay: 0.1 }}
//               className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
//             />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="pt-4"
//           >
//             <motion.button
//               whileHover={{ 
//                 scale: 1.02,
//                 boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
//               }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg relative overflow-hidden group"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 {navigation.state === "submitting" ? (
//                   <>
//                     <motion.span
//                       animate={{ rotate: 360 }}
//                       transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                       className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                     />
//                     LOGGING IN...
//                   </>
//                 ) : (
//                   "Log In"
//                 )}
//               </span>
//               <motion.span
//                 initial={{ x: "-100%", opacity: 0 }}
//                 animate={{ x: isHovered ? "100%" : "-100%", opacity: 0.6 }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                 className="absolute inset-0 bg-white/20"
//                 style={{ skewX: "-20deg" }}
//               />
//             </motion.button>
//           </motion.div>
//         </Form>

//         <AnimatePresence>
//           {errors && (
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="mt-6 p-4 bg-red-50/90 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center"
//             >
//               {errors.message || "Something went wrong."}
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="mt-8 text-center text-sm text-gray-500"
//         >
//           Don't have an account?{" "}
//           <a href="#" className="text-blue-600 hover:underline font-medium">
//             Sign up
//           </a>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }






// import { Form, useActionData, useNavigation } from "react-router-dom";

// export default function LoginForm() {
//   const errors = useActionData();
//   const navigation = useNavigation();



//   return (
    
//     <div className="animate-slide-down bg-gradient-to-r from-white  to-gray-200 shadow-2xl rounded-xl px-8 py-10 w-full max-w-lg mx-auto">
//       <Form method="post" className="space-y-6">
//         <div className="grid grid-cols-1 gap-6">
          
          

//           {/* Email */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-semibold text-gray-800">Email</label>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="you@example.com"
//               className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Password */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-semibold text-gray-800">Password</label>
//             <input
//               type="password"
//               name="password"
//               required
//               placeholder="••••••••"
//               className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

         

//           {/* Submit Button */}
//           <div className="pt-2">
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-blue-600 transition font-semibold text-sm shadow-md"
//             >
//               {navigation.state === "submitting" ? "LOGGING IN..." : "Log In"}
//             </button>
//           </div>

//           {/* Error Message */}
//           {errors && (
//             <div className="text-red-600 text-sm font-semibold text-center">
//               {errors.message || "Something went wrong."}
//             </div>
//           )}
//         </div>
//       </Form>
//     </div>
//   );
// }
