import React, { Suspense } from "react";
import LoginPage from "./LoginPage";

const LoginSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default LoginSuspense;
