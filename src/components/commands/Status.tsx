/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const Status: React.FC =  memo((id: number) => {

    const inputText = String.raw`
    <text color:#FAB387>Status</text>:<text color:#A6E3A1>Online</text>: 
    <br>
    <br>
    <text color:#EBA0AC>${import.meta.env.VITE_FIRSTNAME}</text>
    <text size:24px color:#94E2D5>💛 5 days ago</text><text>:</text>
    <br>
     <text size:22px>currently learning rust, this is so difficult!</text>
    <br><br>
    <text color:#EBA0AC>${import.meta.env.VITE_FIRSTNAME}</text>
    <text size:24px color:#94E2D5>💛 15 days ago</text><text>:</text>
    <br>
     <text size:22px>please someoen gib referral!!!</text>
    <br><br>

    `

    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
        href={"rydermitchell.com"}
       />
    );
  });
  
  export default Status;
  