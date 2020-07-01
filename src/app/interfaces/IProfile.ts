export interface IProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    qualification: string;
    dateofbirth: string;
    address: string;
    addresses:string[];
    status: number;
    country: string;
    color: string[];
    role: string;
}

export interface ISelect {
    id: number;
    name: string;
}
