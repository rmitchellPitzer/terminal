/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */

import { memo, useContext } from "react";
import { termContext } from './Terminal';
import Fullscreen from '../media/FULLSCREEN.svg'
import Close from '../media/CLOSEACTUAL.svg'
import Minimize from '../media/MINIMIZE.svg'
import Menu from '../media/MENU.svg'
import Settings from '../media/SETTINGS.svg'
import Webgui from '../media/WEBGUI.svg'
import { MenuButton } from "./styles/MenuBarStyle";

  const MenuBar: React.FC =  memo(() => {
    const { tabId, tabs, updateTabId, menusActive, updateMenusActive, updateInput} = useContext(termContext);
    // console.log("THE ENTRIES ARE")
    // console.log(Object.entries(tabNames))
//     const closeTab = async (url: string) => {
//         const newWindow = await window.open(url, '_blank');

//   if (newWindow) {
//     newWindow.close();
//   }
// }
function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

    return (
        <>
        <div style={{display: "flex", flexDirection: "row",  gap: "10px", width: "calc(100% - 34px)", justifyContent: "space-between" }}>
            {/* fix this later, there's some behavior in browsers preventing this from working */}
             <div style={{display: "flex", flexDirection: "row", marginLeft: "24px", gap: "0px", height: "42px",}}>
             {/* {!menusActive[0] &&  */}
             <div style={{flexShrink: "0"}}>
            <button style={{backgroundColor: "transparent"}}>
            <img style={{width: "22px", height: "22px", margin: "auto"}} onClick={() => window.open("https://rydermitchell.com/", '_self')
} src={Close}></img>
</button>
            <button style={{backgroundColor: "transparent"}}>
            <img onClick={() => updateInput("unfortunately there is no requestMinimize api :(")} style={{width: "22px", height: "22px", margin: "auto"}} src={Minimize}></img>
            </button>
            <button style={{backgroundColor: "transparent"}}>
            <img style={{width: "22px", height: "22px", margin: "auto"}} onClick={() => toggleFullScreen()} src={Fullscreen}></img>
            </button> </div> 
            {/* } */}
            {/* fix this later, need to add state toggle for menus */}
            {/* <button onClick={() => updateMenusActive(menusActive[0] ? [false, false] : [true, false])} style={{backgroundColor: "transparent", marginLeft: "25px"}}>
                <img style={{width: "22px", height: "22px", margin: "auto", 
                    // marginLeft: (menusActive[0] ? "-24px" : "0px")}} 
                    marginLeft: "0px"}} 

                    src={Menu}></img>
            </button> */}
           
            </div>
            {/* fix this later, need to add state toggle for menus */}

            
        {/* tabs */}
        <div style={{position: "relative",display: "flex", flexDirection: "row", flexGrow: "1", flexShrink: "1", minWidth: "1px",  height: "42px", }}>

        {Object.entries(tabs).map((tab, key) => (
            // <button key={tab[0]} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: "1px",  fontFamily: "Work Sans", height: "42px", zIndex: "3",

            //     backgroundColor: "rgba(0,0,0,0)", color: tabId == Number(tab[0]) ? "#FDFDFD" : "#BAC2DE",  flexBasis: "100%", margin: "0px", padding: "0px", fontSize: "1.05rem", lineHeight:  "2.45"}}  onClick={() => updateTabId(Number(tab[0]))}>
            //         /{tab[1].name}
            //         <hr style={{backgroundColor: tab[1].color, width: "100%", minWidth: "1px",  height: "1px", marginTop: "-3px", zIndex: "4",}}/>
            // </button>
            <MenuButton key={tab[0]} style={{ color: tabId == Number(tab[0]) ? "#FDFDFD" : "#BAC2DE"}}  onClick={() => updateTabId(Number(tab[0]))}>
                    /{tab[1].name}
                    <hr style={{backgroundColor: tab[1].color, width: "100%", minWidth: "1px",  height: "1px", marginTop: "-2px", zIndex: "4",}}/>
            </MenuButton>
        ))}
        
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginRight: "0px" }}>
    {/* settings */}
    <button onClick={() => updateMenusActive(menusActive[1] ? [false, false] : [false, true])} style={{ backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center", padding: "0" }}>
        <img src={Settings} alt="Settings" />
    </button>

    {/* webview website */}
    <button style={{ backgroundColor: "transparent", display: "flex", justifyContent: "center", alignItems: "center", marginRight: "0px", padding: "0" }}>
        <a href={"https://rydermitchell.com/"} style={{ display: 'block', maxWidth: '150px' }} target="_blank" rel="noreferrer">
            <img src={Webgui} alt="Webgui" />
        </a>
    </button>
</div>

        {/* line break in page */}
        </div>
        <hr style={{backgroundColor: "#9399B2", height: "1px", 
            width: "calc(100% - 34px)", 
            zIndex: "2",
            margin: "auto", marginTop: "-2.5px", borderRadius: "100000px"}} />
        </>
    );
  });
  
  export default MenuBar;
  