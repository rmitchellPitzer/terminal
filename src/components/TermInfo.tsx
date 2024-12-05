import { CatBlue, CatOrange, CatRed, Wrapper } from "./styles/TerminalInfo.styled";
import { useLocation } from 'react-router-dom';

const TermInfo = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <CatBlue>visitor</CatBlue> <CatRed>~Portfolio{location.pathname}</CatRed> <CatOrange>git:(rileyis.online)</CatOrange>:
      {/* visitor ~Portfolio/home git:(Ryder):  */}
    </Wrapper>
  );
};

export default TermInfo;
