import styled from "styled-components";

export const MainScreenContainer = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const SubTitle = styled.h3`
  color: #333;
  margin: 1rem 0;
`;

export const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Heading = styled.h2`
  text-align: center;
  color: #333;
`;

export const Field = styled.div`
  margin-bottom: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 4px;
  border: 1px solid #ccc;
`;

export const DatePickerWrapper = styled.div`
  width: 100%;
  padding-top: 4px;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1rem;
`;

export const Result = styled.p`
  margin-top: 1rem;
  font-size: 1.25rem;
  text-align: center;
  color: #333;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

export const ListItem = styled.li`
  padding: 0.75rem;
  background-color: #f1f1f1;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const ItemButton = styled.button`
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 1rem;
`;
