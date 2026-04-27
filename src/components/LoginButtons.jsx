"use client";
import { signIn } from "next-auth/react";
import React from "react";

const LoginButtons = () => {
  return (
    <button onClick={() => signIn()} className="btn">
      Login Now
    </button>
  );
};

export default LoginButtons;
