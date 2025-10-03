import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader.jsx";
import ToastContainer from "./components/Toast/ToastContainer.jsx";


function App() {

  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <div>
      {isCheckingAuth? <PageLoader/> : <></>}
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
