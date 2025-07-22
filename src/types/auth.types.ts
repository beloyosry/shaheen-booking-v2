export type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;

    login: (credentials: LoginData) => Promise<void>;
    register: (credentials: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<User | null>;
};

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterData = {
    name: string;
    code: string;
    phone: string;
    email: string;
    password: string;
    account_type: string;
};

export type User = {
    id: number;
    name: string;
    code: string;
    phone: string;
    email: string;
    accountType: string;
    status: string;
    phoneVerifiedAt: boolean;
};
