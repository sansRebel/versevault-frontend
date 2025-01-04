
export interface User{
    id: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User
}

export interface Comment {
    id: string;
    user: string;
    content: string;
    createdAt: string;
}

export interface Blog{
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: string;
    createdAt: string;

}