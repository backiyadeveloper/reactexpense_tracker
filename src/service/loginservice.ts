// src/services/authService.ts

import { User, TokenPayload } from "../models/loginmodel";

// API call to sign up a user
export async function signupUser(user: User): Promise<Response> {
  const response = await fetch("http://localhost:8080/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}

// API call to log in a user
export async function loginUser(user: User): Promise<Response> {
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}

// Function to parse a JWT token and extract the payload
export function parseJwt(token: string): TokenPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
}
