"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simple credential validation
      if (email === "noman@gmail.com" && password === "123") {
        // Store auth token in localStorage
        localStorage.setItem("authToken", "demo-token-" + Date.now());
        localStorage.setItem("userEmail", email);
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Use noman@gmail.com / 123");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="login-card">
          {/* Logo - Responsive sizing */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <Image
              src="/chic-logo.jpg"
              alt="Chic Glam Logo"
              width={120}
              height={120}
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
              priority
            />
          </div>

          {/* Title - Responsive font size */}
          <h1
            className="text-center mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            Admin Dashboard
          </h1>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            {/* Error Message */}
            {error && (
              <div
                className="text-xs sm:text-sm"
                style={{
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  color: "#dc2626",
                  border: "1px solid #dc2626",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                }}
              >
                {error}
              </div>
            )}

            {/* Email Input */}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              required
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            {/* Login Button - Responsive padding */}
            <Button
              type="submit"
              className="w-full py-2 sm:py-2.5 text-sm sm:text-base font-medium"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                border: "none",
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Demo Credentials - Responsive */}
          <div
            className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md"
            style={{
              backgroundColor: "rgba(57, 45, 34, 0.05)",
              borderColor: "var(--primary-color)",
              borderWidth: "2px",
            }}
            onClick={() => {
              setEmail("noman@gmail.com");
              setPassword("123");
            }}
          >
            <p
              className="text-xs sm:text-sm font-semibold mb-1.5"
              style={{ color: "var(--primary-color)" }}
            >
              <strong>Demo Credentials (Click to auto-fill):</strong>
            </p>
            <div className="space-y-0.5">
              <p
                className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 p-1.5 sm:p-2 rounded transition-colors break-all"
                style={{ color: "#374151" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setEmail("noman@gmail.com");
                  setPassword("123");
                }}
              >
                <strong>Email:</strong> noman@gmail.com
              </p>
              <p
                className="text-xs sm:text-sm cursor-pointer hover:bg-gray-100 p-1.5 sm:p-2 rounded transition-colors"
                style={{ color: "#374151" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setEmail("noman@gmail.com");
                  setPassword("123");
                }}
              >
                <strong>Password:</strong> 123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
