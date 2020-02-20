
export interface Auth {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    verified: boolean;
    createdAt: string;
    roles: Role[];
    refreshToken: string;
    updatedAt: string;
}

export interface Role {
    id: string;
    role: string;
}
