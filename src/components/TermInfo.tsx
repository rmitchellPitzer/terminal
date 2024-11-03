import { CatBlue, CatOrange, CatRed, Wrapper } from "./styles/TerminalInfo.styled";

const TermInfo = () => {
  return (
    <Wrapper>
      <CatBlue>visitor</CatBlue> <CatRed>~Portfolio/home</CatRed> <CatOrange>git:(RyderThe.dev)</CatOrange>:
      {/* visitor ~Portfolio/home git:(Ryder):  */}
    </Wrapper>
  );
};

export default TermInfo;
