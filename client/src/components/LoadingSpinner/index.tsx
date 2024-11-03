import React from "react";
import { SpinnerContainer } from "./styles";

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <p>Loading...</p>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
