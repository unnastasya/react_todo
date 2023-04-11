export type UserType = {
	email: string;
	fullName: string;
	password: string;
	id: number;
};

export type UserLoginType = {
    [index: string]: any;
	email: string;
	password: string;
};

export type UserRegisterType = {
    [index: string]: any;
	email: string;
    fullName: string;
	password: string;
};

