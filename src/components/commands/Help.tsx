/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";
import { possibleCmds } from "../../utils/commands";
import { commands } from "../Terminal";
import { generateTabs } from "../../utils/funcs";
const Help: React.FC =  memo((id: number) => {

    let inputText = String.raw`Here are all commands you can use!<br>`;



    for (let i = 0; i < commands.length; i++) {
        // console.log(commands[i])
        inputText += `<updateinput input:"${commands[i].cmd}" color:${commands[i].color}>${commands[i].cmd}</updateinput>`+ generateTabs(commands[i].tab) + commands[i].desc + "<br>"
    }


    // <text color:#F38BA8>H</text><text color:#EBA0AC>i </text><text color:#FAB387>a</text><text color:#F9E2AF>l</text><text color:#A6E3A1>l</text><text color:#94E2D5>!</text><text color:#89DCEB>!</text> I’m [<text color:#A6E3A1>Ryder</text>], a software developer from <text color:#EBA0AC>California </text> that makes <link href="https://www.google.com" color:#F9E2AF>Silly Things</link> that live on the internet. I love practicing <text color:#89DCEB>UI/UX Design</text> , and hope to be able to do it as a <text color:#F38BA8>job</text> someday! <br> I adore games like <text font:DeterminationMono color:#FFFFFF>Undertale</text>, <text color:#CBA6F7>One Shot</text>, <text color:#FAB387>Outer Wilds</text>, If <text color:#89DCEB>F</text><text color:#F5C2E7>o</text><text color:#FFFFFF>u</text><text color:#F5C2E7>n</text><text color:#89DCEB>d</text>, <text color:#F38BA8>Night in the Woods</text>, and <text color:#74C7EC>VA-11 Hall-A</text>. <br><br> I love listening to <text color:#95CA93>Porter Robinson</text>, Car Seat Headrest, <text color:#89DCEB>In Love With a Ghost</text>, Nana Grizol, <text color:#CBA6F7>Glass Beach</text>, MGMT, <text color:#F5C2E7>Kimya Dawson</text> <text color:#F38BA8>Nujabes</text>, The Postal Service, <text color:#F2CDCD>Potsu</text>, Florist, Toby Fox, Lena Raine, Hakita, 2 Mello, and Andrew Prahlow. <br><br> I try not to watch too much <text color:#CBA6F7>anime</text> or read too much <text color:#EBA0AC>manga</text>, but I do love <text color:#89DCEB>Frieren</text>, <text color:#F9E2AF>Mob Psycho</text>, <text color:#74C7EC>Keep Your Hands Off Eizouken</text>, <text color:#F2CDCD>How Do We Relationship</text>, and <text color:#95CA93>Girls Last Tour</text>. <br><br> My <link href="https://www.google.com" color:#74C7EC>Github is here</link>, my <link href="https://www.google.com" color:#89DCEB>LinkedIn here</link>, and <link href="https://www.google.com" color:#95CA93>E-mail here</link>! <br>`
    
    
    // String.raw`
    // <text color:#F38BA8>H</text><text color:#EBA0AC>i </text><text color:#FAB387>a</text><text color:#F9E2AF>l</text><text color:#A6E3A1>l</text><text color:#94E2D5>!</text><text color:#89DCEB>!</text>
    // I’m [<text color:#A6E3A1>Ryder</text>], a software developer from 
    // <text color:#EBA0AC>California </text>
    // that makes
    // <link href="https://www.google.com" color:#F9E2AF>Silly Things</link>
    // that live on the internet. I love practicing
    // <text color:#89DCEB>UI/UX Design</text>
    // , and hope to be able to do it as a 
    // <text color:#F38BA8>job</text>
    // someday!
    // <br>
    // I adore games like
    // <text font:DeterminationMono color:#FFFFFF>Undertale</text>,
    // <text color:#CBA6F7>One Shot</text>,
    // <text color:#FAB387>Outer Wilds</text>,
    // If
    // <text color:#89DCEB>F</text><text color:#F5C2E7>o</text><text color:#FFFFFF>u</text><text color:#F5C2E7>n</text><text color:#89DCEB>d</text>,
    // <text color:#F38BA8>Night in the Woods</text>,
    // and
    // <text color:#74C7EC>VA-11 Hall-A</text>.
    // <br><br>
    // I love listening to
    // <text color:#95CA93>Porter Robinson</text>,
    // Car Seat Headrest,
    // <text color:#89DCEB>In Love With a Ghost</text>,
    // Nana Grizol,
    // <text color:#CBA6F7>Glass Beach</text>,
    // MGMT,
    // <text color:#F5C2E7>Kimya Dawson</text>
    // <text color:#F38BA8>Nujabes</text>,
    // The Postal Service,
    // <text color:#F2CDCD>Potsu</text>,
    // Florist, Toby Fox, Lena Raine, Hakita, 2 Mello, and Andrew Prahlow.
    // <br><br>
    // I try not to watch too much
    // <text color:#CBA6F7>anime</text>
    // or read too much
    // <text color:#EBA0AC>manga</text>,
    // but I do love
    // <text color:#89DCEB>Frieren</text>,
    // <text color:#F9E2AF>Mob Psycho</text>, 
    // <text color:#74C7EC>Keep Your Hands Off Eizouken</text>,
    // <text color:#F2CDCD>How Do We Relationship</text>,
    // and
    // <text color:#95CA93>Girls Last Tour</text>.
    // <br><br>
    // My
    // <link href="https://www.google.com" color:#74C7EC>Github is here</link>, my <link href="https://www.google.com" color:#89DCEB>LinkedIn here</link>, and <link href="https://www.google.com" color:#95CA93>E-mail here</link>!
    // <br>
    // `

    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default Help;
  