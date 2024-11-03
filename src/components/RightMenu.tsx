/* eslint-disable react/display-name */
import { memo } from "react";
import DropDownMenu from "./DropDownMenu";
import { LeftSideContainer } from "./styles/Menus";
import Close from '../media/CLOSEMENU.svg'
import { Slider, RangeSlider } from 'rsuite';


const dropdownItems = [
    {title: "Theme",
        items: [
            {
                icon: "person",
                title: "Cozy",
                commandLink: "display kelvin.svg"
            },
            {
                icon: "person",
                title: "Cozy",
                commandLink: "display kelvin.svg"
            },
            {
                icon: "person",
                title: "Cozy",
                commandLink: "display kelvin.svg"
            },

        ]
    },
    {title: "Audio", items: [
        {
                icon: "person",
                title: "Cozy",
                commandLink: "display kelvin.svg"
            }
    ]},
    {title: "Text", items: [
        {
                icon: "person",
                title: "Cozy",
                commandLink: "display kelvin.svg"
            }
    ]},
]



const RightMenu: React.FC =  memo(() => {
    return(
    <div style={{width: "320px", height: "100vh", position: "relative", flexGrow:"0", flexShrink: "0", backgroundColor: "#313244", borderRadius: "8px 0px 0px 8px"}}>
            
        <div style={{height: "39.5px", display: "flex", flexDirection: "row", justifyContent: "end"}}>
            <img style={{width: "20px", height: "20px", marginTop: "auto", marginBottom: "auto", marginRight: "25px"}} src={Close}></img>
        </div>
         <hr style={{backgroundColor: "#9399B2", height: "1px", 
            width: "calc(100% - 34px)", 
            zIndex: "2",
            margin: "auto", marginTop: "0px", borderRadius: "100000px"}} />
        
        <LeftSideContainer>
            
            <div style={{padding: "20px", fontSize: "2.0rem"}}>
            <span style={{color: "#FAB387", }}>Config</span>
            {/* <br/> */}
            <div style={{fontSize: "1.6rem", lineHeight: "2rem", marginTop: "0px"}}>
            Some settings for changing the <span style={{color: "#94E2D5"}}>appearance</span> of the website!
            </div>
            <div style={{display: "flex", gap: "20px", flexDirection: "column"}}>
            {dropdownItems.map(({title, items}) => (
                <DropDownMenu key={title} title={title} items={items} />
            ))}
                        <Slider style={{background: "#94E2D5", color: "#FFFFFF"}}  />

          
            </div>
            </div>

    
            </LeftSideContainer>
    </div>);
});

export default RightMenu; 