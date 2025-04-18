import { useRef, useEffect } from "react";
import LoginForm from "./LoginForm";

export default function LoginModal({ onClose }) {
  const wrapperRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
      <div ref={wrapperRef} className="max-w-md w-full">
        <LoginForm />
      </div>
    </div>
  );
}
