/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const Contact: React.FC =  memo((id: number) => {

    const inputText = String.raw`
    Send me a message, I don't byte!
    <br>
    <text color:#74C7EC>Github: </text>
    <link href="https://github.com/rmitchellPitzer" color:#74C7EC>rmitchellpitzer</link>,
    <br>
    <text color:#F5C2E7>LinkedIn: </text>
    <link href="https://www.linkedin.com/in/rmitche/" color:#F5C2E7>rmitche</link>,
    <br>
    <text color:#95CA93>Email: </text>
    <link href="mailto:rmitche@pitzer.edu" color:#95CA93>rmitche@pitzer.edu</link>.
    <br>
    `

    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default Contact;
  