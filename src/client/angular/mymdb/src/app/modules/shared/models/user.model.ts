import { IToken } from '../../auth/models/token.model';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    private _roles: string[],
    private _token: string,
    private _tokenExpiresAt: Date
  ) {}

  get token(): string | null {
    if (!this._tokenExpiresAt || this._tokenExpiresAt < new Date()) {
      return null;
    }

    return this._token;
  }

  get tokenExpirationDelay(): number {
    if (!this._tokenExpiresAt || this._tokenExpiresAt < new Date()) {
      return 0;
    }

    return this._tokenExpiresAt.getTime() - new Date().getTime();
  }

  public hasRole(role: string): boolean {
    return this._roles.includes(role) ? true : false;
  }

  static createFromStorage(user: IUserStorage): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user._roles,
      user._token,
      new Date(user._tokenExpiresAt)
    );
  }

  static createFromToken(token: IToken): User {
    return new User(
      token.userId,
      token.userName,
      token.userEmail,
      token.roles,
      token.accessToken,
      new Date(token.expiresAt)
    );
  }
}

export interface IUserStorage {
  id: string;
  name: string;
  email: string;
  _roles: string[];
  _token: string;
  _tokenExpiresAt: string;
}
