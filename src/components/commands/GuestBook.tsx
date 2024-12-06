/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo, useEffect, useState } from "react";
import Line from "./Line";
import axios from "axios";
import * as Cheerio  from "cheerio";
import _ from "lodash";

const GuestBook: React.FC =  memo((id: number) => {
    const [displayedMessages, setMessages] = useState([]);

    useEffect(() => {
        (async () => {
            try {
              // Make a request to the website
              const url = import.meta.env.VITE_CORSPROXYURL+import.meta.env.VITE_GUESTBOOKURL; // Replace with your actual URL
              
              const response = await axios.get(url);
          
              // Load the HTML content into Cheerio
              const $ = Cheerio.load(response.data);
          
              // Find all div elements with the specified class
              const divClass = ".box.message"; // The class you're looking for
              const messages = [];
          
              $(divClass).each((index, element) => {
                const message = {};
          
                // Extract the author (strong element)
                const author = $(element).find("strong").text().trim();
                message.author = author || null;
          
                // Extract the time (span element)
                const timeElement = $(element).find(".message-time");
                message.time = timeElement.text().trim() || null;
                message.dataTime = timeElement.attr("data-time") || null;
          
                // Extract the message text (p element)
                const text = $(element).find(".message-text").text().trim();
                message.text = text || null;
          
                messages.push(message);
              });
          
              // Output the messages
              setMessages(messages)
            //   console.log("MESSAGES ARE ")
            //   console.log(messages)
              messages.forEach((msg) => {
                // console.log(`Author: ${msg.author}`);
                // console.log(`Time: ${msg.time} (Data Time: ${msg.dataTime})`);
                // console.log(`Message: ${msg.text}`);
                // console.log("-".repeat(40));
              });
            } catch (error) {
              console.error("Error fetching or parsing data:", error);
            }
          })();
    }, []);

    let inputText = String.raw`Here are the first 5 messages you can see in my <link href="${import.meta.env.VITE_GUESTBOOKURL}" color:#74C7EC>Guestbook</link>!<br><br>`;

    const colors = ["#A6E3A1", "#F9E2AF", "#CBA6F7", "#F5C2E7", "#FAB387"]

    for (let i = 0; i < displayedMessages.length; i++) {
        // console.log(commands[i])
        const selectedColors = _.shuffle(colors).slice(0,4);

        inputText +=  `
        <text color:${selectedColors[0]}>${displayedMessages[i].author}</text>
        <text size:22px>${displayedMessages[i].time} </text>
        <br>
        <text size:20px>${displayedMessages[i].text}</text>
        <br><br>`
        if (i == 4){
            break
        }
    }

    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default GuestBook;
  