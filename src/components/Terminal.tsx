import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import Output from "./Output";
import TermInfo from "./TermInfo";
import {
  CmdNotFound,
  Empty,
  Form,
  Hints,
  Input,
  MobileBr,
  MobileSpan,
  Suggestion,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";
import Commands from "./Commands";
import MenuBar from "./MenuBar";
import { possibleCmds } from "../utils/commands";
import LeftMenu from "./LeftMenu";
import { CatBlue, CatOrange, CatRed } from "./styles/TerminalInfo.styled";
import RightMenu from "./RightMenu";
type Command = {
  cmd: string;
  desc: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "test", desc: "testing for debugging", tab: 7 },
];

// new types as part of changing how tabs work:
type OutputPart = {
  type: string;
  content?: string;
  src?: string;
  color?: string;
}

type NewCommand = {
  input: string;
  id: number;
  output: OutputPart[]
}


type CmdHistory = {
  [id: number]: NewCommand[]
}

type Inputs = {
  [id: number]: string[]
}

type NewHints = {
  [id: number]: string[]
}

type Pointers = {
  [id: number]: number
}

type Tab = { 
  name: string;
  color: string;
}

type TabNames = {
  [id: number]: Tab
}


type Term = {
  arg: string[];
  history: string[];
  rerender: boolean;
  index: number;
  clearHistory?: () => void;
  // new items.
  tabId: number;
  cmdHistory:  CmdHistory;
  inputs: Inputs;
  hints: NewHints;
  pointers: Pointers;
  rendering: number[];
  commandIds: number;
  tabNames: TabNames;
  removeFromRendering?: (id: number) => void;
  updateTabId?: (id: number) => void;
  menusActive: boolean[];
  updateMenusActive?: (newMenuState: boolean[]) => void;
  updateInput?: (newInputVal: string) => void;

};

export const termContext = createContext<Term>({
  arg: [],
  history: [],
  rerender: false,
  index: 0,


  // new context added by myself, window pointer can be had in the parent component. only things
  // this component needs is the commands.
  // each command needs to be read in from file, rendered, then 

  tabId: 0,
  cmdHistory: {0: []},
  inputs: {0: []},
  hints: {0: []},
  pointers: {0: -1},
  rendering: [0,1],
  commandIds: 2,
  tabNames: {0: {name: "home", color: "#CBA6F7"},
  1: {name: "work", color: "#EBA0AC"},
  2: {name: "about", color: "#A6E3A1"},
  3: {name: "contact", color: "#89B4FA"}},
  menusActive: [false, false],
  
});

const Terminal = () => {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // State variables
  const [inputVal, setInputVal] = useState("");
  // const [cmdHistory, setCmdHistory] = useState<string[]>([]);

  const [rerender, setRerender] = useState(false);
  const [hints, setHints] = useState<string[]>([]);
  const [pointer, setPointer] = useState(-1);
  const [tabId, setTabId] = useState<number>(0);
  const [commandId, setCommandId] = useState<number>(2);
  const [rendering, setRendering] = useState<number[]>([0, 1]);
  const [tabNames, setTabNames] = useState<TabNames>({
    0: {name: "home", color: "#CBA6F7"},
    1: {name: "work", color: "#EBA0AC"},
    2: {name: "about", color: "#A6E3A1"},
    3: {name: "contact", color: "#89B4FA"}}
  );


  const [menusActive, setMenusActive] = useState<boolean[]>([false, false])


  // change back to default values later
  const [suggestions, setSuggestions] = useState<string[]>([""]); // Suggested command based on input
  const [suggestion, setSuggestion] = useState(''); // Suggested command based on input
  const [suggestionPointer, setSuggestionPointer] = useState(0); // Suggested command based on input




  // new state variables
  const [newCmdHistory, setNewCmdHistory] = useState<CmdHistory>({
    0: [{
      id: 0,
      input: "test",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }],
    1: [{
      id: 1,
      input: "work",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }],
    2: [{
      id: 2,
      input: "about",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }],
    3: [{
      id: 3,
      input: "contact",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }], 

  });

  const renderNewText = (inputval: string) => {
    // work on this later
    const id = commandId
    setCommandId(commandId + 1);
    setRendering([... rendering, id])

    return(
      {
        id: id,
        input: inputval,
        output: 
        [
      {type: "text",
        content: "asdf",
        color: "#ffffff"
      }
    ]})
  };

  const getNewCmdHistory = (inputVal: string, isClear?: boolean) => {
    const updatedCmdHistory = newCmdHistory
    if (isClear){
      updatedCmdHistory[tabId] = []
      return updatedCmdHistory
    }
    const output = renderNewText(inputVal)
    updatedCmdHistory[tabId] = [output,  ...updatedCmdHistory[tabId]]
    return updatedCmdHistory
  };

  const updateInput = (inputVal: string) => {
    setInputVal(inputVal)
    setSuggestions([])
    setSuggestion("")
    setSuggestionPointer(-1)
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRerender(false);
      setInputVal(e.target.value);
      

      let matchingCommands: string[] = [];
      possibleCmds.forEach((cmd) => {
        if (cmd.startsWith(e.target.value) && e.target.value != "") {
          matchingCommands = [...matchingCommands, cmd];
        }
      });
      setSuggestions(matchingCommands)
      if (matchingCommands.includes(suggestion)){
        setSuggestionPointer(matchingCommands.indexOf(suggestion))
      }
      else if (matchingCommands.length == 0){
        setSuggestionPointer(-1)
        setSuggestion("")
      }
      else{
        setSuggestion(matchingCommands[0])
        setSuggestionPointer(0)
      }
      if (e.target.value.length <= inputVal.length){
        setSuggestionPointer(-1)
      }
    },
    [inputVal]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCmdHistory([inputVal, ...cmdHistory]);
    setNewCmdHistory(getNewCmdHistory(inputVal))
    setInputVal("");
    // setRerender(true);
    setHints([]);
    setPointer(-1);
    setSuggestionPointer(-1)
    setSuggestion("")
  };

  const clearHistory = () => {
    // setCmdHistory([]);
    setHints([]);
  };

  const updateMenusActive = (newMenu: boolean[]) => {
    console.log("PROPS PASSED TO IT ARE")
    console.log(newMenu)
    setMenusActive(newMenu);
  };

  const updateTabId = (id: number) => {
    setTabId(id)
  } 
  const removeFromRendering = (id: number) => {
    let renderCopy = rendering
    renderCopy = renderCopy.filter(function(item) {
        return item !== id
    })
    setRendering(renderCopy)
  };

  // const pushTo = () => {
  //   // setCmdHistory([]);
  //   setHints([]);
  // };

  // focus on input when terminal is clicked
  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };

  // come back later:

  // const overlayRef = useRef(null);
  // useEffect(() => {
  //   if (inputRef.current && overlayRef.current) {
  //     const targetRect = inputRef.current.getBoundingClientRect();

  //     overlayRef.current.style.position = 'absolute';
  //     overlayRef.current.style.top = `${targetRect.top}px`;
  //     overlayRef.current.style.left = `${targetRect.left}px`;
  //     overlayRef.current.style.width = `${targetRect.width}px`;
  //     overlayRef.current.style.height = `${targetRect.height}px`;
  //     overlayRef.current.style.paddingLeft = `18.5px`;
  //   }
  // }, []);

  useEffect(() => {
    document.addEventListener("click", handleDivClick);    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  // Keyboard Press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    console.log(e.key)
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    // if Tab or Ctrl + I
    if (e.key === "Tab" || ctrlI) {
     
     
      // THIS ENTIRE PART IS THE TAB/AUTOCOMPLETE FUNCTIONALITY!!
     
      e.preventDefault();
      if (!inputVal) return;
      let tempPointer = suggestionPointer + 1
      if (tempPointer == suggestions.length){
        tempPointer = 0
      }
      setSuggestionPointer(tempPointer)
    }

    if (e.key === "ArrowRight"){
      e.preventDefault();
      setInputVal(suggestions[suggestionPointer])
      setSuggestions([suggestions[suggestionPointer]])
    }

    // if (e.key === "Backspace") {
    //   console.log("BACKSPACE HIT!!!")
    //   setSuggestionPointer(-1)
    //   setSuggestions([])
    //   setSuggestion("")
    // }



    // OKAY DONE WITH IT!





    // if Ctrl + L
    if (ctrlL) {
      clearHistory();
    }

    // Go previous cmd
    if (e.key === "ArrowUp") {
      if (pointer >= newCmdHistory[tabId].length) return;

      if (pointer + 1 === newCmdHistory[tabId].length) return;

      setInputVal(newCmdHistory[tabId][pointer + 1].input);
      setPointer(prevState => prevState + 1);
      inputRef?.current?.blur();
    }

    // Go next cmd
    if (e.key === "ArrowDown") {
      if (pointer < 0) return;

      if (pointer === 0) {
        setInputVal("");
        setPointer(-1);
        return;
      }

      setInputVal(newCmdHistory[tabId][pointer - 1].input);
      setPointer(prevState => prevState - 1);
      inputRef?.current?.blur();
    }
  };

  // const updateHistory(tabId: number) => {

  // }

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputVal, pointer]);


  // const formHeightRef = useRef<HTMLFormElement>(null);
  // const [formHeight, setFormHeight] = useState(0);

  // useEffect(() => {
  //     setFormHeight(formHeightRef.current.getBoundingClientRect().height);
  // }, []);


  const contextValue = {
    // arg: _.drop(commandArray),
    history: newCmdHistory,
    rerender,
    // index,
    clearHistory,
    removeFromRendering,
    tabId,
    cmdHistory: newCmdHistory,
    inputs: inputVal,
    rendering: rendering,
    tabNames: tabNames,
    menusActive: menusActive,
    updateTabId,
    updateMenusActive,
    updateInput
  };
  // useEffect(() => {
  //   console.log(document.getElementById('formUsed')?.clientHeight)
  // }, [])

  // const [formHeight, setFormHeight] = useState(0);
  // window.onresize = function () {
  //       console.log(document.getElementById('formUsed')?.clientHeight)
  //       setFormHeight(document.getElementById('formUsed')?.clientHeight)
  // }


  return (
    <div style={{display: "flex", flexDirection: "row", width: "100%", overflow: "hidden"}}>
     {menusActive[0] &&<termContext.Provider value={contextValue}>
    <LeftMenu />
    </termContext.Provider>}

    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
     <termContext.Provider value={contextValue}>
        <MenuBar />
      </termContext.Provider>
    <Wrapper data-testid="terminal-wrapper" ref={containerRef}>

    {/* {suggestionPointer > -1 && ( */}
        {/* <div> */}
          {/* {hints.map(hCmd => ( */}
            {/* <Hints key={suggestions[suggestionPointer]}>{suggestions[suggestionPointer]}</Hints> */}
          {/* ))} */}
        {/* </div> */}
      {/* )} */}


      {/* {hints.length > 1 && (
        <div>
          {hints.map(hCmd => (
            <Hints key={hCmd}>{hCmd}</Hints>
          ))}
        </div>
      )} */}
      <Form id="formUsed" onSubmit={handleSubmit}>
        <TermInfo /> 
        <MobileBr />

        <div style={{
          position: "relative", 
          flexShrink: "1",
          flexGrow: "1",
          whiteSpace: "nowrap",
          minWidth: "200px",
          marginBottom: "40px",
          height: "0px",
          display: "inline-block"
        }}>
             {/* {document.getElementById('formUsed')?.clientHeight > 41 && <MobileSpan>&#62;</MobileSpan> } */}
             <MobileSpan>&#62;</MobileSpan>
          <Input
            title="terminal-input"
            type="text"
            id="terminal-input"
            autoComplete="off"
            spellCheck="false"
            autoFocus
            autoCapitalize="off"
            ref={inputRef}
            value={inputVal}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            // style={{background: "transparent", color: "#F2CDCD"}}
            style={{background: "transparent"}}

          />
            { suggestionPointer > -1 && (<Suggestion>{suggestions[suggestionPointer]}</Suggestion>)}
        </div>
      </Form>

      {/* <Form onSubmit={handleSubmit}> */}
        {/* <TermInfo />  */}
        {/* <MobileBr /> */}

        {/* <div style={{
          position: "relative", 
          flexShrink: "1",
          flexGrow: "1",
          whiteSpace: "nowrap",
          minWidth: "100px",
          width: "100%"
      
        }}> */}
        {/* <MobileSpan>&#62;</MobileSpan> */}

          {/* <Input
            title="terminal-input"
            type="text"
            id="terminal-input"
            autoComplete="off"
            spellCheck="false"
            autoFocus
            autoCapitalize="off"
            ref={inputRef}
            value={inputVal}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            style={{background: "transparent"}}
          /> */}
            {/* { suggestionPointer > -1 && (<Suggestion>{suggestions[suggestionPointer]}</Suggestion>)} */}
        {/* </div> */}
      {/* </Form> */}
      

      <termContext.Provider value={contextValue}>
      <Commands />
     {/* { */}
        {/* // suggestionPointer > -1 &&  */}
        {/* (<div style={{position: "absolute"}}> */}
          {/* {suggestions[suggestionPointer]} */}
          {/* about */}
        {/* </div>) } */}

</termContext.Provider>


      {/* {newCmdHistory[tabId].map((cmdH, index) => {
        const commandArray = _.split(_.trim(cmdH.input), " ");
        const validCommand = _.find(commands, { cmd: commandArray[0] });
        // const history = useContext(termContext);
        // history.cmdHistory[tabId] = cmdHistory

        const contextValue = {
          arg: _.drop(commandArray),
          history: newCmdHistory,
          rerender,
          index,
          clearHistory,
          removeFromRendering,
          tabId,
          cmdHistory: newCmdHistory,
          inputs: inputVal,
          rendering: rendering,
        };
        return (
          <div key={_.uniqueId(`${cmdH}_`)}>
            <div>
              <TermInfo />
              <MobileBr />
              <MobileSpan>&#62;</MobileSpan>
              <span data-testid="input-command">{cmdH.input}</span>
            </div>
            {validCommand ? (
              <termContext.Provider value={contextValue}>
                <Output index={index} cmd={commandArray[0]} id={cmdH.id} />
              </termContext.Provider>
            ) : cmdH.input === "" ? (
              <Empty />
            ) : (
              <CmdNotFound data-testid={`not-found-${index}`}>
                command not found: {cmdH.input}
              </CmdNotFound>
            )}
          </div>
        );
      })} */}
      {/* <button onClick={ () => setTabId(tabId == 0? 1 : 0)} >press me to update tabId!</button> */}
    </Wrapper>
    </div>
    
    {menusActive[1] && <termContext.Provider value={contextValue}>
    <RightMenu />
    </termContext.Provider>}

    </div>
  );
};

export default Terminal;
