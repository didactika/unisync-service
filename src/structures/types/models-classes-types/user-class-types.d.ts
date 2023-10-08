export type UserFilter = {
    id?: string;
    uuid?: string;
    username?: string;
    email?: string;
}

export type UserFormatedResponse = {
    id?: string;
    uuid?: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
}