// src/models/authModels.ts

// Interface for user data
export interface User {
    username: string;
    password: string;
  }
  
  // Interface for decoded token payload
  export interface TokenPayload {
    userid: string;
    username: string;
  }
  