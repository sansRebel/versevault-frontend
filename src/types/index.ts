
export interface User{
    id: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User
}

export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

export interface Comment {
    id: string;
    user: string;
    content: string;
    createdAt: string;
}

export interface Blog{
    _id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: string;
    createdAt: string;
    likes: number;
    comments?: {user: string, content: string}[];


}