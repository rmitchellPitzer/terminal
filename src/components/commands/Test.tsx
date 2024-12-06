/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

// import { AboutWrapper, HighlightAlt, HighlightSpan } from "../styles/About.styled";
import { memo } from "react";
import Line from "./Line";

  
  const Test: React.FC =  memo((id: number) => {
  // console.log("ID IS")
  // console.log(id)
// const inputText = String.raw`
// Hello! My name is [<color:#F38BA8>deadname</color> <color:#F38BA8>lol</color>], i am a <color:#89B4FA>CS</color> <color:#89B4FA>major</color> from <color:#F9E2AF>Claremont,</color> <color:#F9E2AF>CA</color>. I’m particularly interested in !![React](https://www.google.com){color:#74C7EC}, <color:#F5C2E7>GraphQL</color>, <color:#94E2D5>Node.JS</color>, and  <color:#A6E3A1>Spring</color>. 
// Here is an image!! : ![React Logo](/React-icon.svg)
// `


// const inputText = String.raw`
// Hello! My name is [<text color:#F38BA8>${import.meta.env.VITE_FIRSTNAME}</text> <text color:#F38BA8>${import.meta.env.VITE_LASTNAME}</text>], i am a <text color:#89B4FA>CS</text> <text color:#89B4FA>major</text> from <text color:#F9E2AF>Claremont,</text> <text color:#F9E2AF>CA</text>. I’m particularly interested in 
// <link href="https://www.google.com" color:#74C7EC>React</link>, <text color:#F5C2E7>GraphQL</text>, <text color:#94E2D5>Node.JS</text>, and  <text color:#A6E3A1>Spring</text>. <br><br>
// Use the [<text color:#F38BA8>help</text>] command to see the available commands! There’s plenty of fun things to do here!
// <br><br><br><br>
// `



const inputText = String.raw`
Hello! My name is [<text color:#F38BA8>${import.meta.env.VITE_FIRSTNAME}</text> <text color:#F38BA8>${import.meta.env.VITE_LASTNAME}</text>], i am a <text color:#89B4FA>CS</text> <text color:#89B4FA>major</text> from <text color:#F9E2AF>Claremont,</text> <text color:#F9E2AF>CA</text>. I’m particularly interested in <text color:#74C7EC>React</text>, <text color:#F5C2E7>GraphQL</text>, <text color:#94E2D5>Node.JS</text>, and  <text color:#A6E3A1>Spring</text>. <br><br>Use the [<updateinput input:"help" color:#F38BA8>help</updateinput>] command to see the available commands! There’s plenty of fun things to do here!
<br><br><br><br>
`


// const inputText = String.raw`
// Hello! My name is [<text color:#F38BA8>Riley</text> <text color:#F38BA8>Mitchell</text>], i am a <text color:#89B4FA>CS</text> <text color:#89B4FA>major</text> from <text color:#F9E2AF>Claremont,</text> <text color:#F9E2AF>CA</text>. I’m particularly interested in 
// <link href="https://www.google.com" color:#74C7EC>React</link>, <text color:#F5C2E7>GraphQL</text>, <text color:#94E2D5>Node.JS</text>, and  <text color:#A6E3A1>Spring</text>. 

// Use the [help] command to see the available commands! There’s plenty of fun commands to use here!
// Here is an image!! : ![React Logo](/React-icon.svg)
// <text font:ComicMono size:18px color:#4CAF50 effect:bold>This is bold green text</text>
// <link href="https://example.com" font:ComicMono size:18px color:#4CAF50 effect:italic>This is an italic green link</link>
// <br><br>
// `

// const inputText = String.raw`
// Hello! My name is [<color:#F38BA8>deadname</color> <color:#F38BA8>lol</color>], i am a <color:#89B4FA>CS</color> <color:#89B4FA>major</color> from <color:#F9E2AF>Claremont,</color> <color:#F9E2AF>CA</color>. I’m particularly interested in !![React](https://www.google.com){color:#74C7EC}, <color:#F5C2E7>GraphQL</color>, <color:#94E2D5>Node.JS</color>, and  <color:#A6E3A1>Spring</color>. 
// Here is an image!! :
// `


    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default Test;
  