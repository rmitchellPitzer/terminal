/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const Work: React.FC =  memo((id: number) => {

    const inputText = String.raw`
    I've worked on some of the following at these places:
    <br><br>
    <link href="https://www.google.com" size:28px color:#95CA93>Assistant Programmer</link>
    <br>
    <text size:24px>National Core Renaissance</text>
    <br>
    <text size:24px>Jan 2024 - Aug 2024</text>
    <br>
    <text size:22px>Developed a dashboard visualizing energy usage in affordable housing developments using Typescript, Nest.js, PostgreSQL, Prisma, GraphQL, and Next.js.</text>
    <br><br>

    <link href="https://www.google.com" size:28px color:#6FBDE0>Software Developer Intern</link>
    <br>
    <text size:24px>Union of Concerned Scientists</text>
    <br>
    <text size:24px>Aug 2023 - May 2024</text>
    <br>
    <text size:22px>Collaborated with government agencies to visualize IIJA spending in underserved California Communities using R Shiny.</text>
    <br><br>

    <link href="https://www.google.com" size:28px color:#FAB387>Undergraduate CV Researcher</link>
    <br>
    <text size:24px>Harvey Mudd College</text>
    <br>
    <text size:24px>May 2023 - July 2023</text>
    <br>
    <text size:22px>Worked to improve semantic segmentation performance in a research project monitoring honey bee hive health by identifying floral density.</text>
    <br><br>

    <link href="https://www.google.com" size:28px color:#F9E2AF>Python and Java Tutor</link>
    <br>
    <text size:24px>Harvey Mudd College and Pitzer College</text>
    <br>
    <text size:24px>Sep 2022 - Jan 2024</text>
    <br>
    <text size:22px>Assisted professors in teaching course material for courses focused on Python and Java.</text>
    <br><br>

     <link href="https://www.google.com" size:28px color:#89DCEB>Software Engineer Intern</link>
    <br>
    <text size:24px>Braid</text>
    <br>
    <text size:24px>May 2022 - Aug 2024</text>
    <br>
    <text size:22px>Built new pages and features for a mobile fintech startup to increase transactions and revenue.</text>
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
  
  export default Work;
  