export type User = {
  _id?: string;
  password: string;
  username: string;
  purchasedGames: Array<string>;
  credit: number;
  session?: Session;
};
export type Game = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type Session = {
  id: string;
  gameId: string;
  jwt: string;
  secret: string;
};

export interface LoginAndRegisterRequest {
  password: string;
  username: string;
}

export interface LoginAndRegisterResponse {
  isAuthorized: boolean;
  token?: string;
  message?: string;
  user?: User;
}

export interface PurchaseGameRequest {
  userId: string;
  gameId: string;
}

export interface ActivateSessionRequest {
  userId: string;
  gameId: string;
  jwt: string;
}

export interface ActivateSessionResponse {
  secret: string;
}

export interface CheckSessionValidityRequest {
  userId: string;
  gameId: string;
  jwt: string;
}

export interface CheckSessionValidityResponse {
  secret: string;
}
