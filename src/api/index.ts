import axios from "axios";
import {
  PurchaseGameRequest,
  ActivateSessionRequest,
  ActivateSessionResponse,
  CheckSessionValidityRequest,
  CheckSessionValidityResponse,
  LoginAndRegisterResponse,
  LoginAndRegisterRequest,
  User,
} from "../models";
import { invoke } from "@tauri-apps/api/tauri";
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
): Promise<User> => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/purchaseGame",
      requestBody,
      { headers: generateHeaders(jwt ?? ""), withCredentials: true }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const downloadGame = async (
  requestBody: PurchaseGameRequest,
  jwt: string
) => {
  try {
    const response = await axios.post(
      API_BASE_URL + "/api/downloadGame",
      requestBody,
      {
        responseType: "arraybuffer",
        headers: generateHeaders(jwt ?? ""),
        withCredentials: true,
      }
    );

    const filePath = `../game_manager_games/${requestBody.gameId}.zip`;
    const arrayBuffer: ArrayBuffer = await response.data;
    const byteArray = new Uint8Array(arrayBuffer);
    await invoke("save_blob", {
      data: Array.from(new Uint8Array(byteArray)),
      filePath: filePath,
    });

    console.log("File saved successfully:", filePath);
  } catch (error) {
    console.error("Error downloading game:", error);
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
      { headers: generateHeaders(jwt ?? ""), withCredentials: true }
    );
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
