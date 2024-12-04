// import { memo } from "react";
// import { StatusContainer, StatusItem, StatusText, StatusTime } from "./styles/MenuStyle";

// // eslint-disable-next-line react/display-name
// const Status: React.FC =  memo(() => {
//     return(<StatusContainer>
//         <StatusItem>
//             <span style={{color: "#FAB387"}}>Config:</span>
//             |<span style={{color: "#A6E3A1"}}>Online</span>
//             </StatusItem>
//         <StatusTime>Riley 5 days ago</StatusTime>
//         <StatusText>Currently learning rust, this is so difficult!</StatusText>

//     </StatusContainer>);
// });

// export default Status; 

import { memo, useState } from "react";
import { StatusContainer, StatusItem, StatusText, StatusTime } from "./styles/MenuStyle";

// eslint-disable-next-line react/display-name
const Status: React.FC =  memo(() => {
    const [chatterVolume, setChatterVolume] = useState(50);
    const [musicVolume, setMusicVolume] = useState(50);
    const [typingSpeed, setTypingSpeed] = useState(50);

    return(<StatusContainer>
        <StatusItem>
            <span style={{color: "#FAB387"}}>Config:</span>
            {/* |<span style={{color: "#A6E3A1"}}>Online</span> */}
            </StatusItem> 
        <StatusTime><span>Mute Audio</span> <input type="checkbox" checked={true}></input>
            

        </StatusTime>
        <StatusTime>
            <span>Music</span>
            <input
      type="range"
      min="0"
      max="100"
      value={musicVolume}
      onChange={(e) => setMusicVolume(e.target.value)}
    />
        </StatusTime>
        <StatusTime>
            <span>Chatter</span>

        <input
      type="range"
      min="0"
      max="100"
      value={chatterVolume}
      onChange={(e) => setChatterVolume(e.target.value)}
    />
        </StatusTime>
        <StatusTime><span>Typing Animations</span> <input type="checkbox" checked={true}></input></StatusTime>
        <StatusTime><span>Speed</span>
            <input
      type="range"
      min="0"
      max="100"
      value={typingSpeed}
      onChange={(e) => setTypingSpeed(e.target.value)}
    />
        </StatusTime>
        {/* <StatusTime>Mute Audio</StatusTime>

        <StatusText>Currently learning rust, this is so difficult!</StatusText> */}

    </StatusContainer>);
});

export default Status; 