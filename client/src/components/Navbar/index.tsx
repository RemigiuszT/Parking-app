import React from "react";
import { Link } from "react-router-dom";
import { NavbarContainer, Title, NavList, NavItem } from "./styles";

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Title>Parking App</Title>
      <NavList>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/parking-areas">Parking Areas</Link>
        </NavItem>
        <NavItem>
          <Link to="/parking-area-management">Parking Area Management</Link>
        </NavItem>
        <NavItem>
          <Link to="/calculate-payment">Calculate Payment</Link>
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
