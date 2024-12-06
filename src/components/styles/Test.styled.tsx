import styled from "styled-components";
export const LinkTest = styled.a`
  text-underline-offset: 2px;
  transition-duration: 150ms;

&:hover {
  text-underline-offset: 4px;
}

&:focus, &:active {
  text-underline-offset: 2px;  /* Reset to initial state when clicked or focused */
}
`;
