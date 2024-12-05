/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo } from "react";
import Line from "./Line";

const Projects: React.FC =  memo((id: number) => {

    // const inputText = String.raw`
    // <br>
    // <text color:#FAB387>Search for projects with the</text> <text color:#A6E3A1>-t flag</text>: 
    // <br>
    // <br>
    // <link href="https://rydermitchell.com/projects/follow-the-money/" color:#EBA0AC>Follow The Money</link> 
    // <text size:24px color:#94E2D5>🌎| React, R Shiny</text>:
    // <br>
    // <text size:24px>Senior capstone clinic project with the Union of Concerned Scientists on a dashboard to track IIJA spending in vulnerable California Communities.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/pollen/" color:#F9E2AF>Pollen Identification</link> 
    // <text size:24px color:#A6E3A1>🌻| Python, PyTorch, OpenCV</text>:
    // <br>
    // <text size:24px>Computer Vision notebook to be used by researchers to train a model to identify stained pollen grains.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/sage/" color:#A6E3A1>Sage</link> 
    // <text size:24px color:#74C7EC>🍵| React, Rust, Tauri</text>:
    // <br>
    // <text size:24px>Cross platform desktop application to help users buy and sell on popular marketplaces easier.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/start-style-transfer/" color:#FAB387>Start Style Transfer</link> 
    // <text size:24px color:#F5C2E7>🖼️| Python, TensorFlow, OpenCV</text>:
    // <br>
    // <text size:24px>Jupyter Notebook used during the pandemic to transfer styles from buildings on campus on other photos.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/ics-specific-language/" color:#B4BEFE>ICS Specific Language</link> 
    // <text size:24px color:#89DCEB>🐍| Python, TKinter</text>:
    // <br>
    // <text size:24px>Desktop application built with a domain specific language to preview and output ics calendar files for students.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/todoiz/" color:#89B4FA>ToDoiz.io</link> 
    // <text size:24px color:#CBA6F7>📝| React, Redux, Firebase</text>:
    // <br>
    // <text size:24px>Note taking webapp allowing for user authentication and sharing notes via Google Firestore.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/news-analysis/" color:#94E2D5>News Analysis</link> 
    // <text size:24px color:#A6E3A1>🗞️| Python, NLTK, Seaborns</text>:
    // <br>
    // <text size:24px>Sentiment analysis of fake news and real news in a Kaggle dataset using NLTK.sentiment.vader.</text>
    // <br><br>
    // <link href="https://rydermitchell.com/projects/pygame/" color:#F38BA8>PyGame Tutorial</link> 
    // <text size:24px color:#F5C2E7>🎮| Python, PyGame</text>:
    // <br>
    // <text size:24px>Jupyter Notebook used to teach students Python, Computer Science Fundamentals, and PyGame.</text>
    // <br><br>
    //  <link href="https://rydermitchell.com/projects/outer-wilds/" color:#FAB387>LoFi Outer Wilds</link> 
    // <text size:24px color:#89B4FA>🚀| React, Howler</text>:
    // <br>
    // <text size:24px>Website built to sync instruments and ambience together from the game Outer Wilds.</text>
    // <br><br>
    // `

    const inputText = String.raw`
    <br>
    <link href="https://rydermitchell.com/projects/follow-the-money/" color:#EBA0AC>Follow The Money</link> 
    <text size:24px color:#94E2D5>🌎| React, R Shiny</text>:
    <br>
    <text size:24px>Senior capstone clinic project with the Union of Concerned Scientists on a dashboard to track IIJA spending in vulnerable California Communities.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/pollen/" color:#F9E2AF>Pollen Identification</link> 
    <text size:24px color:#A6E3A1>🌻| Python, PyTorch, OpenCV</text>:
    <br>
    <text size:24px>Computer Vision notebook to be used by researchers to train a model to identify stained pollen grains.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/sage/" color:#A6E3A1>Sage</link> 
    <text size:24px color:#74C7EC>🍵| React, Rust, Tauri</text>:
    <br>
    <text size:24px>Cross platform desktop application to help users buy and sell on popular marketplaces easier.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/start-style-transfer/" color:#FAB387>Start Style Transfer</link> 
    <text size:24px color:#F5C2E7>🖼️| Python, TensorFlow, OpenCV</text>:
    <br>
    <text size:24px>Jupyter Notebook used during the pandemic to transfer styles from buildings on campus on other photos.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/ics-specific-language/" color:#B4BEFE>ICS Specific Language</link> 
    <text size:24px color:#89DCEB>🐍| Python, TKinter</text>:
    <br>
    <text size:24px>Desktop application built with a domain specific language to preview and output ics calendar files for students.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/todoiz/" color:#89B4FA>ToDoiz.io</link> 
    <text size:24px color:#CBA6F7>📝| React, Redux, Firebase</text>:
    <br>
    <text size:24px>Note taking webapp allowing for user authentication and sharing notes via Google Firestore.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/news-analysis/" color:#94E2D5>News Analysis</link> 
    <text size:24px color:#A6E3A1>🗞️| Python, NLTK, Seaborns</text>:
    <br>
    <text size:24px>Sentiment analysis of fake news and real news in a Kaggle dataset using NLTK.sentiment.vader.</text>
    <br><br>
    <link href="https://rydermitchell.com/projects/pygame/" color:#F38BA8>PyGame Tutorial</link> 
    <text size:24px color:#F5C2E7>🎮| Python, PyGame</text>:
    <br>
    <text size:24px>Jupyter Notebook used to teach students Python, Computer Science Fundamentals, and PyGame.</text>
    <br><br>
     <link href="https://rydermitchell.com/projects/outer-wilds/" color:#FAB387>LoFi Outer Wilds</link> 
    <text size:24px color:#89B4FA>🚀| React, Howler</text>:
    <br>
    <text size:24px>Website built to sync instruments and ambience together from the game Outer Wilds.</text>
    <br><br>
    `

    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default Projects;
  