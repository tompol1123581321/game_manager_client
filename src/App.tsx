import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginOrRegister } from "./components/login/LoginOrRegisterPage";
import { Activity } from "./components/activity/Activity";
import { AppLayout } from "./components/layout/Layout";
import { GameOverview } from "./components/games_overview/GameOverview";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" Component={LoginOrRegister} />
          <Route path="/list" Component={GameOverview} />
          <Route path="/activity/:gameId" Component={Activity} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
