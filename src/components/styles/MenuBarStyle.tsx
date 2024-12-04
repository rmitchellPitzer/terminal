import styled from "styled-components";

export const MenuBar = styled.div`
  height: 60px;
  width: calc(100vw - 38px);
  margin: auto;
  background-color: #1E1E2E;
  position: fixed;
`;

export const MenuButton = styled.button`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 1px;
  font-family: "Work Sans";
  height: 41px;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0);
  flex-basis: 100%;
  margin: 0;
  padding: 0;
  font-size: 1.05rem;
  line-height: 2.45;
  border-radius: 10px 10px 0px 0px;
  &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.05);

  }
`;