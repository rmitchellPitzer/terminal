/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const GuestBook: React.FC =  memo((id: number) => {

    const inputText = String.raw`
    <br>
    <br>
    <text color:#CBA6F7>Anon</text>
    <text size:22px>11.14.24 at 4:05 AM:</text>
    <br>
    <text size:20px>hi all! the command sent was submit -n ${import.meta.env.VITE_FIRSTNAME}M -e rmitche@pitzer.edu -w ${import.meta.env.VITE_FIRSTNAME}the.dev -m [ERROR maximum recursion depth reached]</text>
    <br><br>
    <text color:#89DCEB>${import.meta.env.VITE_FIRSTNAME}M</text>
    <text size:22px>11.15.24 at 4:05 PM:</text>
    <br>
    <text size:20px>hi all! the command sent was submit -n ${import.meta.env.VITE_FIRSTNAME}M -e rmitche@pitzer.edu -w ${import.meta.env.VITE_FIRSTNAME}the.dev -m [ERROR maximum recursion depth reached], names and website flags are optional!</text>
    `

    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default GuestBook;
  