/* eslint-disable react/display-name */
import Test from "./commands/Test";

import { OutputContainer, UsageDiv } from "./styles/Output.styled";
import { termContext } from "./Terminal";
import { memo, useContext } from "react";

type Props = {
  index: number;
  cmd: string;
  id: number;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.index === nextProps.index && prevProps.cmd === nextProps.cmd;
};

const Output: React.FC<Props> = memo(({ index, cmd, id }) => {

const renderCommand = (cmd) => {
  switch (cmd) {
    // case 'about': return <About />;
    // case 'clear': return <Clear index={index} />;
    // case 'echo': return <Echo index={index} />;
    // case 'education': return <Education />;
    // case 'email': return <Email />;
    // case 'gui': return <Gui />;
    // case 'help': return <Help />;
    // case 'history': return <History index={index} />;
    // case 'projects': return <Projects index={index} />;
    // case 'pwd': return <GeneralOutput>/home/satnaing</GeneralOutput>;
    // case 'socials': return <Socials index={index} />;
    // case 'themes': return <Themes index={index} />;
    // case 'welcome': return <Welcome />;
    // case 'whoami': return <GeneralOutput>visitor</GeneralOutput>;
    case 'test': return <Test id={id} />;
    default: return null;
  }
};




// const specialCmds = ["projects", "socials", "themes", "echo"];
  
// if (!specialCmds.includes(cmd) && arg.length > 0)
//   return <UsageDiv data-testid="usage-output">Usage: {cmd}</UsageDiv>;

return (
  <OutputContainer data-testid={index === 0 ? "latest-output" : null}>
    {renderCommand(cmd)}
  </OutputContainer>
);
});


export default memo(Output, areEqual);
