"use server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";

export const postUser = async (payload) => {
  // No 1. check user exits or not
  const isExit = await dbConnect("users").findOne({ email: payload.email });

  if (isExit) {
    return {
      success: false,
      message: "User already exits",
    };
  }

  //   No 2. New User ta create koro
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const newUser = {
    ...payload,
    createdAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };

  // No 3. Send Data in mongodb

  const result = await dbConnect("users").insertOne(newUser);

  if (result.acknowledged) {
    return {
      success: true,
      message: `User created success ${result.insertedId.toString()}`,
    };
  } else {
    return {
      success: false,
      message: "Bhaiya something went wrong",
    };
  }
};
