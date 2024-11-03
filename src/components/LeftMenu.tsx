/* eslint-disable react/display-name */
import { memo, useContext } from "react";
import Fullscreen from '../media/FULLSCREEN.svg'
import Close from '../media/CLOSEACTUAL.svg'
import Minimize from '../media/MINIMIZE.svg'
import DropDownMenu from "./DropDownMenu";
import { LeftSideContainer } from "./styles/Menus";
import CloseMenu from '../media/CLOSEMENU.svg'
import Person from '../media/PERSON.svg'
import { termContext } from "./Terminal";



const dropdownItems = [
    {title: "Personal",
        items: [
            {
                icon: Person,
                title: "About Me",
                commandLink: "about"
            },
            {
                icon: Person,
                title: "Location",
                commandLink: "location"
            },
            {
                icon: Person,
                title: "Music I Listen To",
                commandLink: "music"
            },

        ]
    },
    {title: "Work", items: [
        {
                icon: Person,
                title: "Experience",
                commandLink: "experience"
            }
    ]},
    {title: "Education", items: [
        {
                icon: Person,
                title: "Education",
                commandLink: "education"
            }
    ]},
    {title: "Fun!", items: [
        {
                icon: Person,
                title: "echo",
                commandLink: "echo"
            }
    ]},
    {title: "????", items: [
        {
                icon: Person,
                title: "coin",
                commandLink: "play coin.wav"
            }
    ]},

]



const LeftMenu: React.FC =  memo(() => {
    const { menusActive, updateMenusActive} = useContext(termContext);

    return(
    <div style={{width: "320px", height: "100vh", position: "relative", flexGrow:"0", flexShrink: "0", backgroundColor: "#313244", borderRadius: "0px 8px 8px 0px"}}>
            
        <div style={{display: "flex", flexDirection: "row", marginLeft: "24px", gap: "0px", height: "42px", justifyContent: "space-between"}}>
           <div>
            <button style={{backgroundColor: "transparent"}}>
                <img style={{width: "22px", height: "22px", margin: "auto"}} onClick={() => window.open("https://rydermitchell.com/", '_self')} src={Close}>
                </img>
            </button>
            {/* fix this later, there's no way to minimize a window so figure out something silly */}
            <button style={{backgroundColor: "transparent"}}>
                <img style={{width: "22px", height: "22px", margin: "auto"}} src={Minimize}></img>
            </button>
            <button style={{backgroundColor: "transparent"}}>
                <img style={{width: "22px", height: "22px", margin: "auto"}} onClick={() => toggleFullScreen()} src={Fullscreen}></img>
            </button>
            </div>
            <button style={{marginTop: "auto", marginBottom: "auto", marginRight: "25px", background: "transparent"}} onClick={() => updateMenusActive([false, false])}>
                <img style={{width: "20px", height: "20px" }} src={CloseMenu}></img>
            </button>
        </div>
         
         <hr style={{backgroundColor: "#9399B2", height: "1px", 
            width: "calc(100% - 34px)", 
            zIndex: "2",
            margin: "auto", marginTop: "-2.5px", borderRadius: "100000px"}} />
        
        <LeftSideContainer>

            <div style={{padding: "20px", fontSize: "2.0rem"}}>
            <span style={{color: "#89DCEB", }}>Hello</span>, <span style={{color: "#FAB387"}}>World!</span>
            {/* <br/> */}
            <div style={{fontSize: "1.6rem", lineHeight: "2rem", marginTop: "0px"}}>
            Here are some suggested
            commands and flows for this website!
            </div>
            <div style={{display: "flex", gap: "20px", flexDirection: "column"}}>
            {dropdownItems.map(({title, items}) => (
                <DropDownMenu key={title} title={title} items={items} />
            ))}
            </div>
            </div>

    
            </LeftSideContainer>
    </div>);
});

export default LeftMenu; 