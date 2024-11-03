import styled from "styled-components";

export const NavbarContainer = styled.nav`
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

export const Title = styled.h2`
  margin: 0;
`;

export const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 1rem;
  padding: 0;
`;

export const NavItem = styled.li`
  a {
    color: #fff;
    text-decoration: none;
  }
`;
