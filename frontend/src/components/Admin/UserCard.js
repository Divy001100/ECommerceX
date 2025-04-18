// components/Admin/UserCard.js
import { motion } from "framer-motion";

export default function UserCard({ user }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-950 p-6 text-white border border-white/10 shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={`/img/users/${user.photo}`}
          alt={user.name}
          className="w-14 h-14 rounded-full border border-white/20 object-cover"
        />
        <div>
          <h3 className="text-xl font-bold text-white">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-2">
        <span className="text-indigo-400 font-semibold">Role:</span> {user.role}
      </p>
      <div className="flex justify-end gap-3">
        <a
          href={`/users/${user._id}/edit`}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl text-sm hover:opacity-90 transition"
        >
          Edit
        </a>
        <button
          onClick={() => console.log("Delete user", user._id)}
          className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-xl text-sm"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
