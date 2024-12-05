/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";
import { generateTabs } from "../../utils/funcs";

const Ascii: React.FC =  memo((id: number) => {

    const inputText = String.raw`
${generateTabs(5)}____${generateTabs(10)}__<br>         
${generateTabs(4)}/ __ \__${generateTabs(0)}______/ /__${generateTabs(0)}_____<br>
${generateTabs(3)}/ /_/ / / / / __${generateTabs(0)}/ _ \/ ___/<br>
${generateTabs(2)}/ _, _/ /_/ / /_/ /  ___/ /<br>    
${generateTabs(1)}/_/ |_|\__, /\__,_/\___/_/<br>     
${generateTabs(7)}/____/<br><br>
${generateTabs(0)} hi all!!                   
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
  
  export default Ascii;
  
    
