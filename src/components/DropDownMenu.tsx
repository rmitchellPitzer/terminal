import React, { memo, useContext, useState } from 'react'
import Arrow from '../media/DROPDOWNARROW.svg'
import { termContext } from './Terminal';



type DropdownItem = {
    icon: any;
    title: string;
    commandLink: string;
}


type DropdownProps = {
    title: string;
    items: DropdownItem[];
  }


  const DropDownMenu: React.FC<DropdownProps> = ({ title, items }) => {
    const { tabId, tabNames, updateTabId, menusActive, updateMenusActive, updateInput} = useContext(termContext);
    

    const [isOpen, setIsOpen] = useState(false)
    return (
    <div>
        <div onClick={() => setIsOpen(!isOpen)} style={{backgroundColor: "#CBA6F7", borderRadius: "15px", padding: "12px", color: "#11111B", display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center"}}>
        {title}
        <img src={Arrow} style={{width: "20px", height: "20px", marginTop: "auto", marginBottom: "auto", rotate: (isOpen ? "90deg" : "0deg")}}></img>
        </div>

        {isOpen && items.map(({icon, title, commandLink}) => (
            <div style={{display: "flex", flexDirection: "row", fontSize: "20px", gap: "10px", fontFamily: "Work Sans", cursor: "pointer"}} key={title}>
                <img src={icon}></img>
                <div onClick={() => {updateInput(commandLink); updateMenusActive([false, false])} }>{title}</div>
            </div>
        ))}
    </div>
  )
}

export default DropDownMenu