import { createContext } from "react";
import { defaultAuthProvider } from "./defaultAuthProvider";

export const AuthContext = createContext(defaultAuthProvider);