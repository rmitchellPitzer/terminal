import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2.3rem;
  padding-top: 0.75rem;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  height: calc(100vh - 2rem - 60px);
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
`;

export const CmdNotFound = styled.div`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
`;

export const Empty = styled.div`
  margin-bottom: 0.25rem;
`;

export const MobileSpan = styled.span`
  line-height: 2px;
  margin-right: 0.75rem;
`;

export const MobileBr = styled.br`
  @media (min-width: 927px) {
    display: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  width: calc(100% - 400px);
  flex-wrap: wrap;
`;

export const Input = styled.input`
  position: absolute;
  border: none;
  z-index: 1;
  top: 0;
  left: 30px;
  line-height: 1.15;
  padding-inline: 2px;
  padding-block: 1px;
  width: calc(100% - 30px);  
`;


export const Suggestion = styled.div`
  position: absolute;
  top: 0;
  left: 30px;
  z-Index: 0; 
  line-height: 1.15;
  overflow: hidden;
  padding-inline: 2px;
  padding-block: 1px;
  color: #7F849C;
  width: calc(100% - 30px);  

`;

export const Hints = styled.span`
  margin-right: 0.875rem;
`;
