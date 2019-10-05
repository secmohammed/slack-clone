
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    seller: boolean;
}

export interface AuthToken {
    id: string;
    name: string;
    token: string;
}

export interface IMutation {
    login(data: LoginUser): AuthToken | Promise<AuthToken>;
    register(data: RegisterUser): User | Promise<User>;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    me(): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    seller: boolean;
    created_at: DateTime;
}

export type DateTime = any;
