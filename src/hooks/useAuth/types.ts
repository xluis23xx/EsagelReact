import { GeneralResponse } from "../types";
import { User } from "../useUsers";

export type JWT = {
    token?: string | null;
    refreshToken?: string | null;
    accessToken?: string | null;
}
export type Auth = {
    username?: string;
    password?: string;
}

export type JWTResponse = JWT & GeneralResponse

export type AuthResponse = JWT & GeneralResponse & {
    user: User
}