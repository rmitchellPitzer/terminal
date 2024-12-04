import styled from "styled-components";


export const MenuContainer = styled.div`
height: fit-content;
display: flex;
position: absolute;
flex-direction: column;
gap: 16px;
right: 20px;
top: 50px;
align-items: end;
overflow: hidden;
pointer-events: none;
  height: calc(100vh - 0rem - 60px);
justify-content: space-around;
  max-height: calc(100vh - 2rem);
flex-grow: 0;
flex-shrink: 0;
pointer-events: none;
  `


// export const StatusContainer = styled.div`
//     overflow: ellipsis;
//     height: fit-content;
//     padding: 5px 15px 10px;
//     width: 350px;
//     background-color:rgba(180,190,254,0.1);
//     border-radius: 10px;
//     border: solid #B4BEFE;
//     display: flex;
//     gap: 0px;
//     flex-direction: column;
//     pointer-events: auto;

// &:hover {
//       cursor: pointer;
//   }
//   }`

export const StatusContainer = styled.div`
    position: absolute;
    right: 20px;
    top: 50px;
    overflow: hidden;
    overflow: ellipsis;
    height: fit-content;
    padding: 5px 15px 10px;
    width: 350px;
    background-color:#2D2E43;
    border-radius: 10px;
    border: solid #B4BEFE;
    display: flex;
    gap: 0px;
    flex-direction: column;

  }`

export const StatusItem = styled.span`
    font-size: 26px;
`

// export const StatusTime = styled.div`
//     font-size: 20px;
//     font-style: italic;
//     color: #B4BEFE;
// `

export const StatusTime = styled.div`
    font-size: 20px;
    color: #CDD6F4;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
`

export const StatusText = styled.div`
    margin-top: -5px;
    font-size: 18px;
    color: #94E2D5;
    line-height: normal;

`


export const GuestBookContainer = styled.div`
    overflow: ellipsis;
    height: fit-content;
    padding: 5px 15px 10px;
    width: 300px;
    background-color:rgba(180,190,254,0.1);
    border-radius: 10px;
    border: solid #B4BEFE;
    display: flex;
    gap: 0px;
    flex-direction: column;
  }`

  export const GuestBookTitle = styled.span`
    font-size: 26px;
    color: #DAAED0;
  `
  export const GuestBookText = styled.div`
    font-size: 20px;
    color: #F9E2AF;
    line-height: normal;

`

export const ListeningContainer = styled.div`
    overflow: ellipsis;
    height: fit-content;
    padding: 5px 15px 10px;
    width: 350px;
    background-color:rgba(180,190,254,0.1);
    border-radius: 10px;
    border: solid #B4BEFE;
    display: flex;
    gap: 10px;
    flex-direction: column;
`

export const ListeningTitle = styled.span`
    font-size: 26px;
    color: #94E2D5;
  `

export const ListeningInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`


export const ListeningArt = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 10px;
`


export const ListeningSong = styled.span`
font-size: 20px;
color: #F9E2AF;
`
export const ListeningArtist = styled.span`
font-size: 20px;
color: #74C7EC;
`

export const ListeningText = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: top;
`

export const BlogPostContainer = styled.div`
    overflow: ellipsis;
    height: fit-content;
    padding: 10px 20px 10px;
    width: 380px;
    background-color:rgba(180,190,254,0.1);
    border-radius: 10px;
    border: solid #B4BEFE;
    line-height: normal;
    font-size: 20px;

`

export const BlogPostTitle = styled.div`
    font-size: 26px;
    color: #74C7EC;
  `

  export const Blogpost = styled.span`
  font-size: 20px;
  color: #F38BA8;
`

export const BlogTimeStamp = styled.span`
font-size: 16px;
color: #A6E3A1;
font-style: italic;
`
export const BlogPostText = styled.div`
font-size: 16px;
color: #B4BEFE;
`