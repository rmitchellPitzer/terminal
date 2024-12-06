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
  TermContainer,
  Wrapper,
} from "./styles/Terminal.styled";
import { argTab } from "../utils/funcs";
import Commands from "./Commands";
import MenuBar from "./MenuBar";
import { possibleCmds } from "../utils/commands";
import LeftMenu from "./LeftMenu";
import { CatBlue, CatOrange, CatRed } from "./styles/TerminalInfo.styled";
import RightMenu from "./RightMenu";
import Status from "./Status";
import GuestBook from "./GuestBook";
import { MenuContainer } from "./styles/MenuStyle";
import Listening from "./Listening";
import Blog from "./Blog";
import { useLocation, useNavigate } from 'react-router-dom';

type Command = {
  cmd: string;
  desc: string;
  color: string;
  tab: number;
}[];

export const commands: Command = [
  { cmd: "test", desc: "testing for debugging", color: "#89DCEB", tab: 7 },
  { cmd: "work", desc: "display prior work", color: "#94E2D5", tab: 7 },
  { cmd: "about", desc: "display information about me", color: "#A6E3A1", tab: 6 },
  { cmd: "contact", desc: "display contact information", color: "#F9E2AF", tab: 4 },
  { cmd: "projects", desc: "display projects information", color: "#FAB387", tab: 3 },
  // { cmd: "status", desc: `display ${import.meta.env.VITE_FIRSTNAME}'s status`, color: "#EBA0AC", tab: 5 },
  { cmd: "guestbook", desc: "view guestbook", color: "#F38BA8", tab: 2 },
  { cmd: "listening", desc: "view listening history", color: "#CBA6F7", tab: 2 },
  { cmd: "help", desc: "view possible commands", color: "#B4BEFE", tab: 7 },
  { cmd: "clear", desc: "Clear commands in this tab", color: "#89B4FA", tab: 6 },
  // { cmd: "clearAll", desc: "Clear all commands in all tabs ", color: "#74C7EC", tab: 3 },
  { cmd: "blog", desc: "display most recent blog posts", color: "#89DCEB", tab: 7 },
  { cmd: "ascii", desc: "display my name in ascii!", color: "#94E2D5", tab: 6 },

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
  [id: number]: string
}

type NewHints = {
  [id: number]: string[]
}

type Pointers = {
  [id: number]: number
}

type suggestion = {
  suggestionText: string;
  suggestionPointer: number;
  suggestionsPossible: string[];
}

type Suggestions = {
  [id: number]: suggestion
}

type Tab = { 
  name: string;
  color: string;
}

type Tabs = {
  [id: number]: Tab
}

// type Tab = { 
//   name: string;
//   color: string;
//   cmdHistory: NewCommand[];
//   pointer: number;
//   input: string;
//   suggestion: string;
// }

// type Tabs = {
//   [id: number]: Tab
// }


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
  tabs: Tabs;
  suggestions: Suggestions;
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

  // pointer for which tab is selected
  tabId: 0,
  // dictionary for cmdhistory for a given tab
  cmdHistory: {0: []},
  // dictionary for the inputs on a given tab
  inputs: {0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: ""},
  // don't think i ever use hints but could be wrong
  hints: {0: []},
  // dictionary for which command is currently being pointed to in a given tab.
  pointers: {0: -1},
  // list of commandids that are rendering
  rendering: [0,1,2,3,4,5,6],
  // pointer for command ids
  commandIds: 2,
  // names for tabs.
  suggestions: {
    0: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    1: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    2: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    3: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    4: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},

    5: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},

    6: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
  },
  tabs: {0: {name: "home", color: "#CBA6F7"},
  1: {name: "about", color: "#A6E3A1"},
  2: {name: "work", color: "#EBA0AC"},
  3: {name: "projects", color: "#89B4FA"},
  4: {name: "contact", color: "#89B4FA"},
  5: {name: "blog", color: "#89B4FA"},
  6: {name: "guestbook", color: "#89B4FA"},
},
  // array for which menus are active
  menusActive: [false, false],
  
});

const Terminal = () => {
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // old state variables, will probably have to remove at some point
  const [rerender, setRerender] = useState(false);
  // const [inputVal, setInputVal] = useState("");
  const [hints, setHints] = useState<string[]>([]);
  // const [pointer, setPointer] = useState(-1);
 // const [suggestions, setSuggestions] = useState<string[]>([""]); // Suggested command based on input
  // const [suggestion, setSuggestion] = useState(''); // Suggested command based on input
  // const [suggestionPointer, setSuggestionPointer] = useState(0); // Suggested command based on input



  // State variables
  const [tabId, setTabId] = useState<number>(0);
  const [commandId, setCommandId] = useState<number>(2);
  const [menusActive, setMenusActive] = useState<boolean[]>([false, false])

  const [inputs, setInputs] = useState<Inputs>({0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "dadadasdasdasdasdasdasdasdsdadadasdasdasdasdasdasdasds"})
  const [suggestions, setSuggestions] = useState<Suggestions>({
    0: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    1: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    2: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    3: {suggestionText: "",
      suggestionPointer: -1,
      suggestionsPossible: []},
    4: {suggestionText: "",
    suggestionPointer: -1,
    suggestionsPossible: []},
    5: {suggestionText: "",
    suggestionPointer: -1,
    suggestionsPossible: []},
    6: {suggestionText: "",
    suggestionPointer: -1,
    suggestionsPossible: []},
  })
  const [rendering, setRendering] = useState<number[]>([0,1,2,3,4,5,6,7]);
  const [tabs, setTabs] = useState<Tabs>({
    0: {name: "home", color: "#CBA6F7"},
    1: {name: "about", color: "#EBA0AC"},
    2: {name: "work", color: "#A6E3A1"},
    3: {name: "projects", color: "#F38BA8"},
    4: {name: "contact", color: "#89B4FA"},
    5: {name: "blog", color: "#FAB387"},
    6: {name: "guestbook", color: "#F9E2AF"},
},
  );
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
      input: "about",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }],
    2: [{
      id: 2,
      input: "work",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }],
    3: [{
      id: 3,
      input: "projects",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }], 
    4: [{
      id: 4,
      input: "contact",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }], 
    5: [{
      id: 5,
      input: "blog",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }], 
    6: [{
      id: 6,
      input: "guestbook",
      output: 
        [{
        type: "text",
        content: "asdf",
        color: "#fffff"
      }],
    }], 
   
    

  });
  const [pointers, setPointers] = useState<Pointers>({0: -1, 1: -1, 2: -1, 3: -1, 4: -1, 5: -1, 6: -1}
  );


  const location = useLocation();
  useEffect(() => {
    // Fetch data or update state based on the new location
    switch (location.pathname) {
      case '/':
        setTabId(0);
        break;
      case '/home':
        setTabId(0);
        break;
      case '/about':
        setTabId(1);
        break;
      case '/work':
        setTabId(2);
        break;
      case '/projects':
        setTabId(3);
        break;
      case '/contact':
        setTabId(4);
        break;
      case '/blog':
        setTabId(5);
        break;
      case '/guestbook':
        setTabId(6);
        break;
      default:
        setTabId(0);
    }
      }, [location.pathname]); // Trigger effect when location changes
 


  // new state variables


  // finish this later
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
    const updatedCmdHistory = {... newCmdHistory}
    if (isClear){
      updatedCmdHistory[tabId] = []
      return updatedCmdHistory
    }
    const output = renderNewText(inputVal)
    updatedCmdHistory[tabId] = [output,  ...updatedCmdHistory[tabId]]
    return updatedCmdHistory
  };

  

  const updateInput = (inputVal: string) => {
    const newInputs = { ...inputs, [tabId]: inputVal };
    const newSuggestions = { ...suggestions };
    newSuggestions[tabId].suggestionsPossible = []
    const newPointers = {... pointers};
    newPointers[tabId] = -1;
    setPointers(newPointers);
    setInputs(newInputs)
    setSuggestions(newSuggestions)
  }

  // const updateInputWithTabChange = (inputVal: string) => {
  //   setInputVal(inputVal)
  //   setSuggestions([])
  //   setSuggestion("")
  //   setSuggestionPointer(-1)
  // }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRerender(false);
      const newInputs = { ...inputs, [tabId]: e.target.value };
      // const newPointers = { ...pointers };

      // if (newPointers[tabId] != -1){
      //   newPointers[tabId] = -1;
      //   setPointers(newPointers)
      // }
      // const newInputs = inputs;
      // newInputs[tabId] = (e.target.value)
      // setInputs(newInputs)
      // might need to remove this block here
      // const newPointers = pointers;
      

      let matchingCommands: string[] = [];
      possibleCmds.forEach((cmd) => {
        if (cmd.startsWith(e.target.value) && e.target.value != "") {
          matchingCommands = [...matchingCommands, cmd];
        }
      });
      const newSuggestions = { ...suggestions };
      newSuggestions[tabId].suggestionsPossible = matchingCommands

      if (matchingCommands.includes(suggestions[tabId].suggestionText)){
        newSuggestions[tabId].suggestionPointer = matchingCommands.indexOf(suggestions[tabId].suggestionText)
      }
      else if (matchingCommands.length == 0){
        newSuggestions[tabId].suggestionPointer = -1
        newSuggestions[tabId].suggestionText = ""
      }
      else{
        newSuggestions[tabId].suggestionText = matchingCommands[0]
        newSuggestions[tabId].suggestionPointer = 0
      }
      if (e.target.value.length <= inputs[tabId].length){
        newSuggestions[tabId].suggestionPointer = -1
      }

      setInputs(newInputs);
      setSuggestions(newSuggestions);    
    },
    [inputs, suggestions, pointers, tabId]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setCmdHistory([inputVal, ...cmdHistory]);
    // setInputVal("");
    const newInputs = {... inputs};
    newInputs[tabId] = ""
    // setRerender(true);
    const newPointers = {... pointers};
    pointers[tabId] = -1
    const newSuggestions = {... suggestions};
    newSuggestions[tabId].suggestionPointer = -1
    newSuggestions[tabId].suggestionText = ""
    if (inputs[tabId] === "clear" ){
      console.log(newCmdHistory)
      const updatedCmdHistory = {... newCmdHistory}
      updatedCmdHistory[tabId] = []

      setNewCmdHistory(updatedCmdHistory)
      setSuggestions(newSuggestions)
      setPointers(newPointers);
      setInputs(newInputs)
      setHints([]);
      return
    }
    setNewCmdHistory(getNewCmdHistory(inputs[tabId]))
    setSuggestions(newSuggestions)
    setPointers(newPointers);
    setInputs(newInputs)
    setHints([]);

  };

  const clearHistory = () => {
    // setCmdHistory([]);
    setHints([]);
  };

  const updateMenusActive = (newMenu: boolean[]) => {
    // console.log("PROPS PASSED TO IT ARE")
    // console.log(newMenu)
    setMenusActive(newMenu);
  };
  const navigate = useNavigate();

  const updateTabId = (id: number) => {
    // setTabId(id)
    navigate(tabs[id].name)
   }
    
    
  const removeFromRendering = (id: number) => {
    if (rendering.includes(id)){
    let renderCopy = rendering
    renderCopy = renderCopy.filter(function(item) {
        return item !== id
    })
    setRendering(renderCopy)
  }};


  // focus on input when terminal is clicked
  const handleDivClick = () => {
    inputRef.current && inputRef.current.focus();
  };

  useEffect(() => {
    document.addEventListener("click", handleDivClick);    return () => {
      document.removeEventListener("click", handleDivClick);
    };
  }, [containerRef]);

  // Keyboard Press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setRerender(false);
    // console.log(e.key)
    const ctrlI = e.ctrlKey && e.key.toLowerCase() === "i";
    const ctrlL = e.ctrlKey && e.key.toLowerCase() === "l";

    // if Tab or Ctrl + I
    if (e.key === "Tab" || ctrlI) {
      e.preventDefault();
      if (!inputs[tabId]) return;

      const newSuggestions = {... suggestions};
      newSuggestions[tabId].suggestionPointer += 1
      if (newSuggestions[tabId].suggestionPointer == newSuggestions[tabId].suggestionsPossible.length){
        newSuggestions[tabId].suggestionPointer = 0
      }
      setSuggestions(newSuggestions)
    }

    if (e.key === "ArrowRight"){
      e.preventDefault();
      const newInputs = {... inputs};
      const newSuggestions = {... suggestions};
      newInputs[tabId] = newSuggestions[tabId].suggestionsPossible[newSuggestions[tabId].suggestionPointer];
      newSuggestions[tabId].suggestionsPossible = [newSuggestions[tabId].suggestionsPossible[newSuggestions[tabId].suggestionPointer]];
      const newPointers = {... pointers};
      newPointers[tabId] = -1;
      setPointers(newPointers);
      setInputs(newInputs)
      setSuggestions(newSuggestions)
    }

    // if Ctrl + L
    if (ctrlL) {
      clearHistory();
    }

    // Go previous cmd
    if (e.key === "ArrowUp") {
      
      const newSuggestions = {... suggestions};
      newSuggestions[tabId].suggestionText = ""
      newSuggestions[tabId].suggestionPointer = -1;
      newSuggestions[tabId].suggestionsPossible = [""]


      setSuggestions(newSuggestions)
      const newPointers = {... pointers};
      if (newPointers[tabId] >= newCmdHistory[tabId].length) return;

      if (newPointers[tabId] + 1 === newCmdHistory[tabId].length) return;

      const newInputs = {... inputs};
      newInputs[tabId] = newCmdHistory[tabId][newPointers[tabId] + 1].input
      setInputs(newInputs)
      newPointers[tabId] += 1
      // setInputVal(newCmdHistory[tabId][pointer + 1].input);
      setPointers(newPointers);
      inputRef?.current?.blur();
      // console.log(newPointers[tabId])
    }

    // Go next cmd
    if (e.key === "ArrowDown") {

      const newSuggestions = {... suggestions};
      newSuggestions[tabId].suggestionText = ""
      newSuggestions[tabId].suggestionPointer = -1;
      newSuggestions[tabId].suggestionsPossible = [""]
      setSuggestions(newSuggestions)
      const newPointers = {... pointers};

    
      if (newPointers[tabId] < 0) return;
      const newInputs = {... inputs};

      if (newPointers[tabId] === 0) {
        newPointers[tabId] = -1;
        newInputs[tabId] = ""
        setInputs(newInputs);
        setPointers(newPointers);
        return;
      }
      newInputs[tabId] = newCmdHistory[tabId][newPointers[tabId] - 1].input;
      setInputs(newInputs)
      newPointers[tabId] -= 1
      setPointers(newPointers);
     
      inputRef?.current?.blur();
    }
  };

  // For caret position at the end
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef?.current?.focus();
    }, 1);
    return () => clearTimeout(timer);
  }, [inputRef, inputs[tabId], pointers[tabId]]);


  const contextValue = {
    // arg: _.drop(commandArray),
    history: newCmdHistory,
    rerender,
    // index,
    clearHistory,
    removeFromRendering,
    tabId,
    cmdHistory: newCmdHistory,
    inputs: inputs,
    rendering: rendering,
    tabs: tabs,
    menusActive: menusActive,
    updateTabId,
    updateMenusActive,
    updateInput
  };
 
  return (
    <div style={{display: "flex", flexDirection: "row", width: "100%", overflow: "hidden"}}>
     {/* {menusActive[0] &&<termContext.Provider value={contextValue}>
    <LeftMenu />
    </termContext.Provider>} */}

    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
     <termContext.Provider value={contextValue}>
        <MenuBar />
      </termContext.Provider>
    {/* <TermContainer> */}
      <Wrapper data-testid="terminal-wrapper" ref={containerRef}>
        <Form id="formUsed" onSubmit={handleSubmit}>
          <TermInfo /> 
          <MobileBr />
          <div 
          style={{
            // position: "relative", 
          //   flexShrink: "1",
            // flexGrow: "1",
            // flex: "1 1 100px",
            // minWidth: "200px",
          //   whiteSpace: "nowrap",
          //   minWidth: "200px",
          //   marginBottom: "40px",
          //   height: "0px",
          //   display: "inline-block",

          // new stuff:
          // position: "sticky"
          // position: "relative",
          // transform: "translateZ(0)"
        //   display: "flex",
        // alignItems: "center", // Align input and suggestion vertically
        // minWidth: "200px",
        // marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        float: "left",
        minWidth: "0px",
        height: "39px",
        width: "stretch",
        flexGrow: "1"

        // width: "100%"
          }}
          >
            <div style={{display: "flex", flexDirection: "row"}}>
                          <MobileSpan>&#62;</MobileSpan>
            
              
                          <div 
          style={{
            // position: "relative", 
          //   flexShrink: "1",
            // flexGrow: "1",
            // flex: "1 1 100px",
            // minWidth: "200px",
          //   whiteSpace: "nowrap",
          //   minWidth: "200px",
          //   marginBottom: "40px",
          //   height: "0px",
          //   display: "inline-block",

          // new stuff:
          // position: "sticky"
          // position: "relative",
          // transform: "translateZ(0)"
        //   display: "flex",
        // alignItems: "center", // Align input and suggestion vertically
        // minWidth: "200px",
        // marginBottom: "40px",
        display: "flex",
        flexDirection: "column",
        float: "left",
        minWidth: "0px",
        height: "39px",
        width: "stretch",
        flexGrow: "1"

        // width: "100%"
          }}
          >
              {/* { suggestions[tabId].suggestionPointer > -1 && (<Suggestion>{
              suggestions[tabId].suggestionsPossible[suggestions[tabId].suggestionPointer]}</Suggestion>)} */}
              <Input
              title="terminal-input"
              type="text"
              id="terminal-input"
              autoComplete="off"
              spellCheck="false"
              autoFocus
              autoCapitalize="off"
              ref={inputRef}
              value={inputs[tabId]}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              style={{background: "transparent"}}

            />
             { suggestions[tabId].suggestionPointer > -1 && (<Suggestion>{
              suggestions[tabId].suggestionsPossible[suggestions[tabId].suggestionPointer]}</Suggestion>)}
            </div>
            </div>
          </div>
        </Form>
        <termContext.Provider value={contextValue}>
          <Commands />
        </termContext.Provider>
      </Wrapper>
    {/* </TermContainer> */}
    {menusActive[1] &&
    <Status />
    // <MenuContainer>
    //     <Status/>
    //   </MenuContainer>
      }
    </div>
    
    {/* {menusActive[1] && <termContext.Provider value={contextValue}>
      <RightMenu />
    </termContext.Provider>} */}
   
    
    </div>
  );
};

export default Terminal;
