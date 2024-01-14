import { Button } from "antd";
import { useCallback, useMemo, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const LoginOrRegister = () => {
  const [pageState, setPageState] = useState<"login" | "register">("login");

  const onLoginOrRegisterSwitchClick = useCallback(() => {
    setPageState(pageState === "login" ? "register" : "login");
  }, [pageState]);

  const pageData = useMemo(() => {
    if (pageState === "login") {
      return {
        buttonText: "Register",
        text: "Please login or",
        component: <Login />,
      };
    }
    return {
      buttonText: "Login",
      text: "Already have an account?",
      component: <Register />,
    };
  }, [pageState]);

  return (
    <div className="container">
      <p>
        {pageData.text}
        <Button
          onClick={onLoginOrRegisterSwitchClick}
          style={{ padding: 0 }}
          type="link"
        >
          {pageData.buttonText}
        </Button>
        !
      </p>

      {pageData.component}
    </div>
  );
};
