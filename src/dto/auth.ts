export type registerUserDto = {
    email: string,
    password: string,
    name: string,
    role:'buyer'|'seller'|'both',
    profilePic?: string
}

export type updateUserDto = {
    email?: string,
    password?: string,
    name?: string,
    role?:'buyer'|'seller'|'both'|'admin'|'agent'|'agency_owner',
    profilePic?: string
}

export type loginUserDto = {
    email: string,
    password: string,
}