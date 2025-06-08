export interface TypeUserCreateProps {
  username: string;
  password: string;
}

export interface TypeUserGetProps extends TypeUserCreateProps {
  createdAt: number;
  avatar?: string;
}
