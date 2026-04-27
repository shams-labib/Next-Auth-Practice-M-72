"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UserCard = () => {
  const session = useSession();

  return (
    <div>
      <h1 className="font-bold">User - Client</h1>
      <div className="p-4 border-2 rounded">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
