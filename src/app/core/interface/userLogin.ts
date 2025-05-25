export interface UserLogin {
    message: string,
    user: {
        id: number,
        username: string,
        password: string,
        role: string
    }
}

export interface Login {
    email: string,
    senha:  string
}

export interface Logged {
    token: string,
    email: string,
    id: string
}