import { memo } from "react";
import { ListeningArt, ListeningArtist, ListeningContainer, ListeningInfo, ListeningSong, ListeningText, ListeningTitle } from "./styles/MenuStyle";
import Nurture from '../media/nurture.jpg';

// eslint-disable-next-line react/display-name
const Listening: React.FC =  memo(() => {
    return(<ListeningContainer>
        <ListeningTitle>
           Now Listening To:
        </ListeningTitle>

           <ListeningInfo>
                <ListeningArt src={Nurture}/>
                <ListeningText>
                    <ListeningSong>Nurture</ListeningSong>
                    <ListeningArtist>Porter Robinson</ListeningArtist>
                </ListeningText>
            </ListeningInfo>
    </ListeningContainer>);
});

export default Listening; 