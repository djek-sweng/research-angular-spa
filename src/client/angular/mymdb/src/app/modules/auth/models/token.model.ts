export interface IToken {
  userId: string;
  userName: string;
  userEmail: string;
  expires: string;
  expiresAt: string;
  accessToken: string;
  roles: string[];
}

export const TOKEN_EMTPY: IToken = {
  userId: '',
  userName: '',
  userEmail: '',
  expires: '',
  expiresAt: '',
  accessToken: '',
  roles: [],
};
