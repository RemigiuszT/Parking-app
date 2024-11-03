import React from "react";
import { MainScreenContainer, Title, Description } from "./styles";

const MainScreen: React.FC = () => {
  return (
    <MainScreenContainer>
      <Title>Welcome to the Parking App</Title>
      <Description>This is a demo application that allows you to:</Description>
      <ul>
        <li>
          Create, edit, and delete parking areas with specific weekday and
          weekend rates.
        </li>
        <li>
          Calculate parking fees based on selected parking area, start and end
          time, and applicable rates.
        </li>
        <li>
          Convert calculated fees to different currencies (USD, EUR, PLN) using
          live exchange rates.
        </li>
      </ul>
      <p>
        Use the navigation menu above to manage parking areas or calculate
        payments. This demo showcases integration with RavenDB as the data store
        and features a user-friendly interface built with React.
      </p>
    </MainScreenContainer>
  );
};

export default MainScreen;
