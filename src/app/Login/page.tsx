// Login.js
"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { auth } from "../fb";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const router = useRouter();
 
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  const Login = (e:any) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(email);
    console.log(password);

   if(email && password){
     signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("signed in successfully");
       toast.success('Login successful!', {
            autoClose: 2000,
          });
        router.push("/Dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("failed: Invalid Credentials");
      });
   }
   
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#0f172a]">
  <div className="w-[480px] mx-auto p-6 bg-[#e5e7eb] rounded-lg shadow-lg mt-8">
    <h2 className="text-2xl font-bold mb-4 text-lime-400 text-center">Login</h2>
    <form onSubmit={Login} className="mt-4 text-center">
      <label className="block mb-2 text-black text-start">
        <p>
          Email
  
        </p>
        <input
          type="email"
          ref={emailRef}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </label>
      <br />
      <label className="block mb-2 text-black text-start">
        <p>Password
          <p className="text-end cursor-pointer text-blue-700"><a>forgot password</a></p>
        </p>
        
        <input
          type="password"
          ref={passwordRef}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </label>
      
      <button
          type="submit"
          className="mt-6 p-2 pl-6 pr-6 bg-blue-500 w-[436px] text-white  rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </button>
      <p className="mt-4 text-md text-black">
        <br />
        Do not have an account? <br />
        <Link className="text-blue-500" href="/Register">
          Register Now
        </Link>
        <ToastContainer position="top-right" />
      </p>
    </form>
    {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
  </div>
</div>

  );
};

export default Login;