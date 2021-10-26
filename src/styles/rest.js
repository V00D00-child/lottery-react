import { createGlobalStyle } from "styled-components"
import styled from "styled-components";

// Global style *******************************/
export const GlobalStyles = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    color: ${props => props.theme.textColorContent};
    font-family: monospace;
  }
`;

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 0em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  :disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

// App.js *******************************/
export const AppHeader1 = styled.h1`
`;

export const AppHeader2 = styled.h2`
`;

export const MainApp = styled.div`
  text-align: center;
  margin: 0 5% 0 5%;
`;

export const UserMessage = styled.p`
`;


// Rules.js *******************************/
export const RulesContainer= styled.div`
  text-align: left;
`;

export const RulesContent = styled.p`
`;

// Connection.js *******************************/
export const ConnectionContainer = styled.div`
  margin-top: 2%;
  text-align: right;
  margin-right: 5%;
`;

// Nav.js *******************************/
export const NavBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.navColor};
  min-height: 50px;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${props => props.theme.textColor};
  list-style: none;
`;

export const NavMenu = styled.div`
  display: block;
  align-items: center;
  justify-content: flex-start;
`;

export const NavLink = styled.div`
  display: block;
  padding: 1rem;
  transition: 250ms ease background-color;
  &:hover {
    cursor: pointer;
    background-color: skyblue;
  }
`;
export const NavUserInfo = styled.div`
  font-siz: 14px
`;

export const NavToggle = styled(NavLink)`
  text-decoration: underline;
  position: static;
  color: red;
`;

// LotteryInfo.js *******************************/
export const LotteryPool = styled.div`
  border: solid 2px;
  padding: 2%;
  margin-top: 3%;
`;
