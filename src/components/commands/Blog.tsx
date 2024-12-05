/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const Blog: React.FC =  memo((id: number) => {

    const inputText = String.raw`
    <br>
    These are some of my latest blog posts!<br><br>
    <link href="https://rydermitchell.com/blog/a-better-terminal-portfolio/" size:28px color:#F38BA8>A Better Terminal Portfolio</link> |
    <text size:26px color:#A6E3A1>28'th Sep 2024</text> <br>
    <text size:24px color:#B4BEFE>Building a more personal shell portfolio.</text> <br><br>
    <link href="https://rydermitchell.com/blog/claremont-colleges-reflection/" size:28px color:#CBA6F7>A Reflection on the Claremont Colleges</link> |
    <text size:26px color:#94E2D5>20’th Aug 2024</text> <br>
    <text size:24px color:#B4BEFE>Thoughts on campus majors, academia vs industry, and the CS major at the Claremont Colleges.</text> <br><br>
    <link href="https://rydermitchell.com/blog/using-sensible/" size:28px color:#FAB387>Using the Sensible API</link> |
    <text size:26px color:#89DCEB>20’th Aug 2024</text> <br>
    <text size:24px color:#B4BEFE>Using Sensible to fetch fields from PDF documents.</text> <br><br>
    
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
  
  export default Blog;
  