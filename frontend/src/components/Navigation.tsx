'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoginModal from './LoginModal';
import { usePathname } from "next/navigation";
export default function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (userData: { username: string }) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setIsLoginOpen(false);
  };
  const pathname = usePathname();
  const lflag = pathname== "/login";
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <nav className={`w-full py-4 px-6 border-b border-gray-100 bg-white ${(lflag? 'fixed':'')}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-blue-600 text-xl font-semibold">LitScout</span>
        </Link>
        
        {/* <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <span className="text-gray-600">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-gray-600 hover:text-gray-800"
            >
              Login
            </button>
          )}
        </div> */}
      </div>
      {/* <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      /> */}
    </nav>
  );
}
