export interface User {
    username: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    createAt?: Date;
    updateAt?: Date;
    refreshToken?: string;
}

