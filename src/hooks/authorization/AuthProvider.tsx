import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../../models";
import { useNavigate } from "react-router-dom";

type UserAuthorizationData = {
  isAuthorized: boolean;
  user?: User;
  jwt?: string;
};

type AuthorizationContext = {
  data: UserAuthorizationData;
  updateUserAuthorizationData?: (data: Partial<UserAuthorizationData>) => void;
};

const defaultUserAuthorizationContext: AuthorizationContext = {
  data: {
    isAuthorized: false,
  },
};

export const authorizationContext = createContext(
  defaultUserAuthorizationContext
);

type Props = PropsWithChildren<{ currentPath: string }>;

export const AuthorizationHandlerComponent: React.FC<Props> = ({
  children,
  currentPath,
}) => {
  const navigate = useNavigate();

  const [userAuthorizationData, setUserAuthorizationData] = useState(
    defaultUserAuthorizationContext.data
  );

  useEffect(() => {
    console.log(currentPath);
    if (
      currentPath !== "" &&
      currentPath !== "/" &&
      !userAuthorizationData.isAuthorized
    ) {
      navigate("/");
    }
  }, [currentPath, userAuthorizationData.isAuthorized]);

  const updateUserAuthData = useCallback(
    (data: Partial<UserAuthorizationData>) => {
      setUserAuthorizationData({ ...userAuthorizationData, ...data });
    },
    [userAuthorizationData]
  );

  const contextValue: AuthorizationContext = useMemo(
    () => ({
      data: userAuthorizationData,
      updateUserAuthorizationData: updateUserAuthData,
    }),
    [updateUserAuthData]
  );

  return (
    <authorizationContext.Provider value={contextValue}>
      {children}
    </authorizationContext.Provider>
  );
};
