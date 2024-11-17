export interface User {
    username: string;
    email: string;
    password: string;
    roleId: string;
    isActive: boolean;
    createAt?: Date;
    updateAt?: Date;
    refreshToken?: string;
}

