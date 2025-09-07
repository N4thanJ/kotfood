export type User = {
  id?: string;
  username: string;
  email: String;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterBody = {
  email: string;
  username: string;
  password: string;
};
