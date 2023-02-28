export interface IUser  {
    username: string;
    password: string;
    date: Date;
}

export interface IUserResponse  {
    username: string;
    token: string;
}