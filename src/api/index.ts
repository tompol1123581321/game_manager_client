import axios from "axios";
import {
  PurchaseGameRequest,
  ActivateSessionRequest,
  ActivateSessionResponse,
  CheckSessionValidityRequest,
  CheckSessionValidityResponse,
  LoginAndRegisterResponse,
  LoginAndRegisterRequest,
} from "../models";

const API_BASE_URL = "http://localhost:8000";

// API calls

const generateHeaders = (jwt: string) => {
  return {
    Authorization: `Bearer ${jwt}`,
  };
};

export const login = async (
  user: LoginAndRegisterRequest
): Promise<LoginAndRegisterResponse> => {
  try {
    const response = await axios.post(API_BASE_URL + "/api/login", user, {
      withCredentials: true,
    });
    console.log(response);

    return response.data;
  } catch (error) {
    return { isAuthorized: false, message: (error as Error).message };
  }
};

export const register = async (
  user: LoginAndRegisterRequest
): Promise<LoginAndRegisterResponse> => {
  try {
    const response = await axios.post(API_BASE_URL + "/api/register", user, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return { isAuthorized: false, message: (error as Error).message };
  }
};

export const purchaseGame = async (
  requestBody: PurchaseGameRequest,
  jwt: string
): Promise<void> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/purchaseGame",
      requestBody,
      { headers: generateHeaders(jwt ?? ""), withCredentials: true }
    );
    console.log(response);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const activateSession = async (
  requestBody: ActivateSessionRequest,
  jwt: string
): Promise<ActivateSessionResponse> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/activateSession",
      requestBody,
      { headers: generateHeaders(jwt ?? "") }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const checkSessionValidity = async (
  requestBody: CheckSessionValidityRequest,
  jwt: string
): Promise<CheckSessionValidityResponse> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/checkSessionValidity",
      requestBody,
      { headers: generateHeaders(jwt ?? "") }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getGameList = async (jwt: string) => {
  try {
    const response = await axios.get(API_BASE_URL + "/api/getAllGames", {
      headers: generateHeaders(jwt ?? ""),
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
