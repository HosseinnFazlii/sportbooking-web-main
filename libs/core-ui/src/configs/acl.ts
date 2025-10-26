import { httpCodes } from "./http-codes"

// libs/core-ui/src/configs/acl.ts
export const aclConfig = {
    "admin": {
        "actions": ["manage"],
        "subjects": ["all"]
    },
    "client": {
        "actions": ["read"],
        "subjects": ["acl-page"]
    }
} as { [role: string]: { actions: string[], subjects: string[] } }

export const publicRoutes = [
    "/",
    "/home",
    "/login",
    "/register",
    "/auth/login",
    "/auth/register",
    ...(httpCodes ? Object.keys(httpCodes).map(code => `/${code}`) : [])
]