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

export const login = async (
  user: LoginAndRegisterRequest
): Promise<LoginAndRegisterResponse> => {
  try {
    const response = await axios.post(API_BASE_URL + "/api/login", user);
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
    const response = await axios.post(API_BASE_URL + "/api/register", user);
    console.log(response);
    return response.data;
  } catch (error) {
    return { isAuthorized: false, message: (error as Error).message };
  }
};

export const purchaseGame = async (
  requestBody: PurchaseGameRequest
): Promise<void> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/purchaseGame",
      requestBody
    );
    console.log(response);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const activateSession = async (
  requestBody: ActivateSessionRequest
): Promise<ActivateSessionResponse> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/activateSession",
      requestBody
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const checkSessionValidity = async (
  requestBody: CheckSessionValidityRequest
): Promise<CheckSessionValidityResponse> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/checkSessionValidity",
      requestBody
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
