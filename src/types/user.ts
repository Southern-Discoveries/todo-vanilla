export interface TypeUserCreateProps {
  username: string;
  subname: string;
  password: string;
}

export interface TypeUserGetProps {
  username: string;
  createdAt: number;
  subname: string;
  avatar?: string;
}

export interface TypeUserEditProps {
  username: string;
  password: string;
  subname: string;
  avatar?: string;
}

export interface TypeUserJWTProps extends TypeUserGetProps {
  iat: number;
  exp: number;
}
