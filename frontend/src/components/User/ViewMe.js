

import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

function ViewMe({ user }) {
  const [modalOpen, setModalOpen] = useState(false);

  if (!user) {
    return (
      <motion.div
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center space-y-4">
          <motion.div
            className="w-16 h-16 mx-auto border-4 border-gray-300 border-t-black rounded-full animate-spin"
          />
          <motion.p className="text-gray-500 text-lg">
            Loading your profile...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 text-black flex flex-col items-center px-6 py-24 gap-12"
    >
      {/* Avatar with premium effect */}
      <motion.div
        className="relative group"
        whileHover={{ scale: 1.02 }}
        onClick={() => setModalOpen(true)}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        <img
          src={user.photo}
          alt={user.name}
          className="w-44 h-44 rounded-full object-cover shadow-2xl border-4 border-white relative z-10 cursor-pointer"
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-medium text-sm transition duration-300 z-20"
        >
          View Full Size
        </motion.span>
      </motion.div>

      {/* Name & Role with elegant typography */}
      <div className="text-center space-y-3">
        <motion.h1 
          className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {user.name}
        </motion.h1>
        <motion.p 
          className="uppercase text-gray-500 tracking-widest text-sm font-medium"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {user.role}
        </motion.p>
      </div>

      {/* Actions - Premium buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-5 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="../updatePassword"
          className="px-8 py-3 text-white bg-gradient-to-r from-black to-gray-800 rounded-full font-medium hover:shadow-lg transition-all duration-300 shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Update Password
        </Link>
        
        <Link
          to="../updateMe"
          className="px-8 py-3 text-white bg-gradient-to-r from-gray-700 to-gray-600 rounded-full font-medium hover:shadow-lg transition-all duration-300 shadow-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Update Info
        </Link>
        
        <Link
          to="/myorders"
          className="px-8 py-3 text-gray-800 border-2 border-gray-800 rounded-full font-medium hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
          </svg>
          My Orders
        </Link>
      </motion.div>

      {/* Fullscreen Modal - Luxury version */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <img
                src={user.photo}
                alt="Full view"
                className="w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ViewMe;














// import { Link } from "react-router";

// function ViewMe({ user }) {
//     if (!user) {
//       return <p className="text-center text-gray-600">Loading user...</p>; // or a loader/spinner
//     }
  
//     return (
//       <article>
//       <ul>
//         <li>
//           <strong>Name:</strong> {user.name}
//         </li>
//         <li>
//           <strong>Role:</strong> {user.role}
//         </li>
//       </ul>
//       <Link to='../updatePassword' >Update Password</Link>
      
//         <Link to='../updateMe' >Update Me</Link>

//         <Link
//           to="/myorders"
//           className="text-blue-600 font-semibold hover:underline"
//         >
//           View My Orders
//         </Link>
      
//       </article>
//     );
//   }
  
//   export default ViewMe;
  