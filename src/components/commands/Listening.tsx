/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo, useEffect, useState } from "react";
import Line from "./Line";
import _ from "lodash";

const Listening: React.FC =  memo((id: number) => {
    
    
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${import.meta.env.VITE_LASTFMUSERNAME}&limit=1&api_key=${import.meta.env.VITE_LASTFMAPIKEY}&format=json`
    const [artistData, setArtistData] = useState("still loading...");
    const [albumData, setAlbumData] = useState("still loading...");
    const [songData, setSongData] = useState("loading...");
    const [linkData, setLinkData] = useState(null);
    const [imageUrlData, setImageUrlData] = useState(null);


    async function cacheImage(imageUrl: URL | RequestInfo) {
        try {
          const response = await fetch(imageUrl);
        //   console.log("ID IS")
        //   console.log(id)
          if (!response.ok) {
            throw new Error('Failed to fetch image');
          }
      
          const blob = await response.blob();
      
          const cache = await caches.open('image-cache');
          await cache.put(imageUrl, new Response(blob));
        } catch (error) {
          console.error('Error caching image:', error);
        }
      }

    useEffect(() => {
      fetch(lastFmUrl)
        .then(response => response.json())
        .then(data => {
            console.log("ID IS")
            console.log(id)
            setArtistData(data.recenttracks.track[0].artist[`#text`]);
            setAlbumData(data.recenttracks.track[0].album[`#text`]);
            setSongData(data.recenttracks.track[0]['name']);
            setLinkData(data.recenttracks.track[0]['url']);
            setImageUrlData(data.recenttracks.track[0]['image'].pop()['#text']);
            cacheImage(data.recenttracks.track[0]['image'].pop()['#text'])})
        .catch(error => console.error('Error:', error));
    }, []);

    


    // const async lastFmData = (requestURL: string | URL | Request) => {
    //     return fetch(requestURL).then(function (response) {
    //         return response.json().then(function (jsonOut) {
    //             return jsonOut["recenttracks"]
    //         });}).catch(function (err) {
    //             // There was an error
    //             console.warn('Something went wrong.', err);});         
    // }; 

    // async function lastFmData(requestURL) {
    //     const response = await fetch(requestURL);
    //     const data = await response.json();
    //     return data;
    //   }
    //  const returnedOutput = await lastFmData(lastFmUrl)
    // console.log(returnedOutput)


    const colors = ["#A6E3A1", "#F9E2AF", "#CBA6F7", "#F5C2E7", "#FAB387"]
    const selectedColors = _.shuffle(colors).slice(0,4);

    const inputText = String.raw`The last song I listened to was <link href="${linkData}" color:${selectedColors[0]}>${songData}</link> by <link href="${linkData}" color:${selectedColors[1]}>${artistData}</link> from <link href="${linkData}" color:${selectedColors[2]}>${albumData}</link>.<br><image src:"${imageUrlData}" href:"${linkData}">${albumData} album art.</image>`

    // ![Album art](${imageUrlData})
    // <image src:"${imageUrlData}" href:"${linkData}" > ${albumData} album art </image>

    
    
    
    const inputSpeed = 10
    return (
        <Line 
        content={inputText}
        id={id}
       />
    );
  });
  
  export default Listening;
  