/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/display-name */
import _ from 'lodash';
import { commands, termContext } from './Terminal';
import TermInfo from './TermInfo';
import { CmdNotFound, Empty, MobileBr, MobileSpan } from './styles/Terminal.styled';
import Output from './Output';
// import Test from './commands/Test';
import React, { useContext } from 'react';
import { CatLavender } from './styles/TerminalInfo.styled';
import TermInfoCommand from './TermInfoCommand';

// const renderCommand = (cmd, index) => {
//     // Define this function outside of the JSX to avoid re-creating it on each render
//     switch (cmd) {
//         // case 'whoami': return <GeneralOutput>visitor</GeneralOutput>;
//       case 'test': return <Test />;
//       default: return null;
//     }
//   };
//   const { arg } = useContext(termContext);

const Commands = React.memo(() => {
    // const cmdHistory = zustandStore(state => state.cmdHistory);
  const { cmdHistory, tabId } = useContext(termContext);
    return (
        <>
        {cmdHistory[tabId].map((cmdH, index) => {
            const commandArray = _.split(_.trim(cmdH.input), " ");
            const validCommand = _.find(commands, { cmd: commandArray[0] });            
            // const commandArray = _.split(_.trim(cmdHistory[cmdHistory.length - index -1]), " ");
            // const validCommand = _.find(commands, { cmd: commandArray[0] });

            return (
            <div key={cmdH.id}>
                <TermInfo />
                {/* <MobileBr /> */}
                <MobileSpan>&#62;</MobileSpan>
                <CatLavender>{cmdH.input}</CatLavender>
                {validCommand ? (
            //   <termContext.Provider value={cmdHistory:tabId}>
                <Output index={index} cmd={commandArray[0]} id={cmdH.id} />
            //   </termContext.Provider>
            ) : cmdH.input === "" ? (
              <Empty />
            ) : (
              <CmdNotFound data-testid={`not-found-${index}`}>
                command not found: {cmdH.input}
              </CmdNotFound>
                )}
            </div>
            );
        })}
        </>
);
});


export default React.memo(Commands);
