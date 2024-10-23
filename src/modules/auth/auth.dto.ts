import { IUserCreationAttributes } from "@/modules/user/user.model"

export type registerUserDto = Omit<IUserCreationAttributes,'role'>  & {
    role: 'buyer' | 'seller' | 'both';
};

export type updateUserDto = Partial<IUserCreationAttributes>;

export type loginUserDto = {
    email: string,
    password: string,
}