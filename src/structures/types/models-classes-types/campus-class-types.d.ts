export type CampusFilter = {
    id?: string;
    uuid?: string;
    name?: string;
    url?: string;
}

export type CampusFormatedResponse = {
    id?: string;
    uuid?: string;
    name?: string;
    url?: string;
    token?: string;
    createdAt?: Date;
}