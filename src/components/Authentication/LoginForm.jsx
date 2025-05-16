// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// // import { Mail, KeyRound } from 'lucide-react';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [formError, setFormError] = useState('');
//   const { login, loading, error } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError('');

//     if (!email.trim()) {
//       setFormError('Email is required');
//       return;
//     }

//     if (!password.trim()) {
//       setFormError('Password is required');
//       return;
//     }

//     try {
//       const success = await login(email, password);
//       if (!success && !error) {
//         setFormError('Invalid email or password');
//       }
//     } catch (err) {
//       setFormError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {(error || formError) && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
//             {error || formError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                 {/* <Mail size={18} /> */}
//               </div>
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
//                 {/* <KeyRound size={18} /> */}
//               </div>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 px-4 ${
//               loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//             } text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm; 


import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!email.trim()) {
      setFormError('Email field cannot be empty');
      return;
    }

    if (!password.trim()) {
      setFormError('Password field cannot be empty');
      return;
    }

    try {
      const isAuthenticated = await login(email, password);
      if (!isAuthenticated && !error) {
        setFormError('Incorrect email or password');
      }
    } catch (e) {
      setFormError('Unexpected error occurred. Please retry.');
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4">
      <div className="bg-gray-50 border border-gray-200 rounded-md p-5 shadow">
        {(formError || error) && (
          <div className="text-red-600 text-sm mb-4 bg-red-100 border border-red-300 rounded px-3 py-2">
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="email" className="text-gray-800 text-sm font-semibold block mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border-gray-300 border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-800 text-sm font-semibold block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white text-sm rounded transition-colors duration-150 ${
              loading ? 'bg-sky-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            {loading ? 'Please wait...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
