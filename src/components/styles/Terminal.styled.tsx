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
  line-height: 1.6;
  margin-right: 0.75rem;
  @media (min-width: 1040px) {
    display: none;
  }
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
  // width: calc(100% - 400px);
  // flex-wrap: wrap;
  @media (max-width: 1040px) {
    flex-direction: column;
  }
      // white-space: nowrap;
  min-width: 0;

`;

export const Input = styled.input`
  position: relative
  border: none;
  z-index: -0;
  // top: 0;
  // left: 30px;
  line-height: 1.15;
  padding-inline: 2px;
  padding-block: 1px;
  // width: calc(100% - 30px);  
  // will-change: transform;
  
  // updated dimensions

  min-width: 0;
  width: 100%;
  height: 39px;
  // margin-bottom: -40px;
  margin-top: 0px;
`;
export const Suggestion = styled.div`
  position: relative  
  // top: 0;
  // left: 30px;
  z-Index: -5; 
  line-height: 1.15;
  overflow: hidden;
  padding-inline: 2px;
  padding-block: 1px;
  color: #7F849C;
  // width: calc(100% - 30px);  

  // updated dimensions

  // will-change: transform;
  height: 39px;
  width: 100%;

  margin-top: -36.5px;

`;

export const Hints = styled.span`
  margin-right: 0.875rem;
`;

export const InputUpdate = styled.span`
  text-underline-offset: 2px;
  transition-duration: 100ms;
  text-decoration: underline;

&:hover {
  text-underline-offset: 4px;
  cursor: pointer;
}

&:focus, &:active {
  text-underline-offset: 2px;  /* Reset to initial state when clicked or focused */
  cursor: pointer;

}
`;