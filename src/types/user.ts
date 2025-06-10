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
  subname: string;
  avatar?: string;
}
