import { CatBlue, CatOrange, CatRed, WrapperCommand } from "./styles/TerminalInfo.styled";

const TermInfoCommand = () => {
  return (
    <WrapperCommand>
      <CatBlue>visitor</CatBlue> <CatRed>~Portfolio/home</CatRed> <CatOrange>git:(RyderThe.dev)</CatOrange>:
      {/* visitor ~Portfolio/home git:(Ryder):  */}
    </WrapperCommand>
  );
};

export default TermInfoCommand;
