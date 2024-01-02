import { invoke } from "@tauri-apps/api";
import { Button } from "antd";
import { useCallback, useMemo, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const LoginOrRegister = () => {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [pageState, setPageState] = useState<"login" | "register">("login");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("login", { name }));
  }

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
