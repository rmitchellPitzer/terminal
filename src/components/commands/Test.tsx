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

const inputText = String.raw`
Hello! My name is [<color:#F38BA8>Ryder</color> <color:#F38BA8>Mitchell</color>], i am a <color:#89B4FA>CS</color> <color:#89B4FA>major</color> from <color:#F9E2AF>Claremont,</color> <color:#F9E2AF>CA</color>. I’m particularly interested in !![React](https://www.google.com){color:#74C7EC}, <color:#F5C2E7>GraphQL</color>, <color:#94E2D5>Node.JS</color>, and  <color:#A6E3A1>Spring</color>. 
Here is an image!! : ![React Logo](/React-icon.svg)
`

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
  