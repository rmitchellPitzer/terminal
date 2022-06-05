import { useContext, useEffect } from "react";
import _ from "lodash";
import { themeContext } from "../../App";
import { UsageDiv, Wrapper } from "../styles/Output.styled";
import { ThemeSpan } from "../styles/Themes.styled";
import { checkThemeRedirect } from "../../utils/funcs";
import theme from "../styles/themes";

const myThemes = _.keys(theme);

const Themes: React.FC<{
  arg: string[];
  history: string[];
  rerender: boolean;
}> = ({ arg, history, rerender }) => {
  const themeSwitcher = useContext(themeContext);
  /* ===== get current command ===== */
  const currentCommand = _.split(history[0], " ");

  /* ===== check current command makes redirect ===== */
  useEffect(() => {
    if (checkThemeRedirect(arg, rerender, currentCommand, myThemes)) {
      themeSwitcher!(theme[currentCommand[2]]);
    }
  }, [arg, rerender, currentCommand]);

  /* ===== check arg is valid ===== */
  const checkArg = (a: string[]) => {
    if (a[0] !== "set" || !_.includes(myThemes, a[1]))
      return (
        <UsageDiv>
          Usage: themes set &#60;theme-name&#62; <br />
          eg: themes set dark
        </UsageDiv>
      );
    return null;
  };

  return arg.length > 0 ? (
    checkArg(arg)
  ) : (
    <Wrapper>
      {myThemes.map((myTheme) => (
        <ThemeSpan key={myTheme}>{myTheme}</ThemeSpan>
      ))}
      <UsageDiv marginY>
        Usage: themes set &#60;theme-name&#62; <br />
        eg: themes set dark
      </UsageDiv>
    </Wrapper>
  );
};

export default Themes;