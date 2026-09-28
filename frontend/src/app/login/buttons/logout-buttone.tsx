"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to logout");

      router.push("/login");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      throw error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div></div>
  );
}