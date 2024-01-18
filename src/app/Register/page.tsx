"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../fb";
import { toast, ToastContainer } from 'react-toastify';
import { FirebaseError } from "firebase/app";


import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

const Register = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);

  const Register = (e:any) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if(email && password) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("SignUp Successful");
        router.push("/Login")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("SignUp Failed");
        // ..
      });
    }
  };

  return (
 <div className="w-screen h-screen flex items-center justify-center bg-[#0f172a]">
      <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto p-6  rounded-md shadow-lg">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-lime-400 text-center">
            User Registration
          </h2>
          <form
            onSubmit={Register}
            className="mt-4 text-center max-w-md mx-auto"
          >
            <label className="block text-lg text-white text-start">
              Email:
              <input
                className="mt-1 p-2 block w-full border border-slate-400 rounded-md focus:outline-none focus:border-blue-500"
                type="email"
                ref={emailRef}
                required
              />
            </label>
            <br />
            <label className="block mt-4 text-white text-start">
              Password:
              <input
                className="mt-1 p-2 block w-full border border-slate-400 rounded-md focus:outline-none focus:border-blue-500"
                type="password"
                ref={passwordRef}
                required
              />
            </label>
            <br />
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-center">
            Have an account? <br />
            <a
              href="/Login"
              className="text-blue-500"
              onClick={() => router.push("/Login")}
            >
              Login Now
            </a>
          </p>
          <ToastContainer position="top-right" />
        </div>
      </div>
    </div>


  );
};

export default Register;
