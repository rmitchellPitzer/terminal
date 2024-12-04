/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const Contact: React.FC =  memo((id: number) => {

    const inputText = String.raw`
    Send me a message, I don't byte!
    <br>
    <text color:#74C7EC>Github: </text>
    <link href="https://www.google.com" color:#74C7EC>rmitchellpitzer</link>,
    <br>
    <text color:#89DCEB>LinkedIn: </text>
    <link href="https://www.google.com" color:#89DCEB>rmitche</link>,
    <br>
    <text color:#95CA93>Email: </text>
    <link href="https://www.google.com" color:#95CA93>rmitche@pitzer.edu</link>.
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
  