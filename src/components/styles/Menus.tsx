import styled from "styled-components";

export const LeftSideContainer = styled.div`
    overflow: scroll;
    height: 100vh;
    ::-webkit-scrollbar {
    width: 15px;
  }
    ::-webkit-scrollbar-track {
        background: #313244;
    }
    ::-webkit-scrollbar-thumb {
        background: #45475A;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #585B70;
    }
`;