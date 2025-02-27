import {RopaInterface} from "./Ropa";

export interface UserInterface {
    id?: number;
    email: string;
    password: string;
    repeatPassword?: string;
}

// interface Credentials {
//     email: string;
//     password: string;
// }
// export type UserLoginOptionalInterface = Omit<UserInterface, "id" | "firstName" | "lastName" | "phone" | "repeatPassword">
export type UserLoginInterface = Pick<UserInterface, "email" | "password">;

export interface UserLogin extends UserInterface {
    token: string;
    roles: RopaInterface[]
}



