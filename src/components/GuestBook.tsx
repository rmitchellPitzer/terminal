import { memo } from "react";
import { GuestBookContainer, GuestBookText, GuestBookTitle} from "./styles/MenuStyle";

// eslint-disable-next-line react/display-name
const GuestBook: React.FC =  memo(() => {
    return(<GuestBookContainer>
        <GuestBookTitle>
           GuestBook:
           </GuestBookTitle>
        <GuestBookText>Feel free to leave a note! :D</GuestBookText>
    </GuestBookContainer>);
});

export default GuestBook; 