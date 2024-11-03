import styled from "styled-components";

export const OutputContainer = styled.div`
  padding-bottom: 0.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;  
  max-width: 1200px;

`;

export const Wrapper = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const UsageDiv = styled.div<{ marginY?: boolean }>`
  margin-top: ${props => (props.marginY ? "0.75rem" : "0.25rem")};
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
`;
