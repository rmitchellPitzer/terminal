import React, { useState, useEffect, useContext } from 'react';
import { LinkTest } from '../styles/Test.styled';
import { termContext } from "../Terminal";
import { InputUpdate } from '../styles/Terminal.styled';
// Custom function to parse content into parts (ignoring tags for typing)
const parseContent = (text) => {
  text = text.replace(/\n/g, '');

  const parts = [];
  let match;
  const combinedRegex = /<text(?:\sfont:(\w+))?(?:\ssize:(\d+px|small|medium|large))?(?:\scolor:(#\w+|[a-zA-Z]+))?(?:\seffect:(bold|italic|underline))?>(.*?)<\/text>|<link(?:\shref="([^"]+)")?(?:\sfont:(\w+))?(?:\ssize:(\d+px|small|medium|large))?(?:\scolor:(#\w+|[a-zA-Z]+))?(?:\seffect:(bold|italic|underline))?>(.*?)<\/link>|<image\s+src:"([^"]+)"(?:\s+href:"([^"]+)")?>(.*?)<\/image>|<updateinput\s+input:"([^"]+)"(?:\sfont:(\w+))?(?:\ssize:(\d+px|small|medium|large))?(?:\scolor:(#\w+|[a-zA-Z]+))?>(.*?)<\/updateinput>|!!\[(.*?)\]\((.*?)\)(\{color:(#\w+|[a-zA-Z]+)\})?|<br>|<jsx>(.*?)<\/jsx>/g;


  
  let lastIndex = 0;
  while ((match = combinedRegex.exec(text)) !== null) {
    // console.log(match)
    const [
      fullMatch, 
      fontFamilyText, 
      sizeText, 
      colorText, 
      effectText, 
      contentText, 
      hrefLink, 
      fontFamilyLink, 
      sizeLink, 
      colorLink, 
      effectLink, 
      contentLink,
      imgSrc, 
      imgHref, 
      altText, 
      // start of someInput
      // replacement Input
      replacementInput, 
      // font
      inputFont,
      // size 
      inputSize,
      // color
      inputColor,
      // displayed input 
      inputDisplay, 
      // end of someInput
      linkColor,
      jsxContent
    ] = match;
    // console.log(match)
    const matchIndex = match.index;

    // Push plain text before the match
    if (matchIndex > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, matchIndex), color: null });
    }

    // Handle <text> tag
    if (contentText !== undefined) {
      parts.push({
        type: 'text',
        content: contentText,
        font: fontFamilyText || 'inherit',
        size: sizeText || 'inherit',
        color: colorText || 'inherit',
        effect: effectText || 'none',
      });
    }

    // Handle <updateInput> tag
    else if (inputDisplay !== undefined) {
      parts.push({
        type: 'updateInput',
        content: inputDisplay,
        font: inputFont || 'inherit',
        size: inputSize || 'inherit',
        color: inputColor || 'inherit',
        replacementInput: replacementInput,
      });
    }
    // Handle <link> tag
    else if (contentLink !== undefined) {
      parts.push({
        type: 'link',
        content: contentLink,
        href: hrefLink,
        font: fontFamilyLink || 'inherit',
        size: sizeLink || 'inherit',
        color: colorLink || 'blue', // Default link color
        effect: effectLink || 'none',
      });
    }

    // Handle image match
    else if (imgSrc !== undefined) {
      parts.push({ type: 'image', src: imgSrc, alt: altText, href: imgHref });
    }

    // Handle link match
    // else if (linkText !== undefined) {
      // parts.push({ type: 'link', content: linkText, href: linkHref, color: linkColor || null });
    // }

    // Handle line break
    else if (fullMatch === '<br>') {
      parts.push({ type: 'lineBreak' });
    }

    // Handle JSX match
    else if (jsxContent !== undefined) {
      parts.push({ type: 'jsx', content: jsxContent });
    }

    // Update lastIndex to move past the current match
    lastIndex = matchIndex + fullMatch.length;
  }

  // Push remaining text after the last match
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex), color: null });
  }
// console.log("PARTS IS")
// console.log(parts)
  return parts;
};



  
// Your existing `parseContent` function remains unchanged

const Line = ({ content, id }) => {
  const { removeFromRendering, rendering, updateInput } = useContext(termContext);
  const [displayedContent, setDisplayedContent] = useState([]); // Rendered content
  const [currentPartIndex, setCurrentPartIndex] = useState(0); // Current part index
  const [charInCurrentPart, setCharInCurrentPart] = useState(0); // Character index in current part

  const parts = parseContent(content); // Parse content

  // if (!rendering.includes(id.id)) {
  //   const parts = parseContent(content); // Parse the content
  //   // console.log("PARSED CONTENT IS ")
  //   // console.log(parts)
  //   return (
  //     // <div style={{cursor: "pointer"}} onClick={() => window.open({href}, '_self')}>
  //     <div>
  //       <p>
  //         {parts.map((part, idx) => {
  //           if (part.type === 'text') {
  //             return (
  //               <span
  //                 key={idx}
  //                 style={{
  //                   color: part.color || 'inherit',
  //                   fontSize: part.size || 'inherit',
  //                   fontFamily: part.font || 'inherit',
  //                   fontWeight: part.effect === 'bold' ? 'bold' : 'normal',
  //                   fontStyle: part.effect === 'italic' ? 'italic' : 'normal',
  //                   textDecoration: part.effect === 'underline' ? 'underline' : 'none',
  //                 }}
  //               >
  //                 {part.content}
  //               </span>
  //             );
  //           } else if (part.type === 'link') {
  //             return (
  //               <LinkTest key={idx}>
  //                 <a
  //                   href={part.href}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   style={{ color: part.color || 'blue', transitionDuration: '200ms' }} // Apply color to the link if specified
  //                 >
  //                   {part.content}
  //                 </a>
  //               </LinkTest>
  //             );
  //           } else if (part.type === 'image') {
  //             return (
  //               <a
  //                 key={idx}
  //                 href={part.src}
  //                 style={{ display: 'block', maxWidth: '150px' }}
  //                 target="_blank"
  //                 rel="noreferrer"
  //               >
  //                 <img
  //                   src={part.src}
  //                   alt={part.alt} // Set the alt text
  //                   style={{ maxWidth: '150px', margin: '10px', verticalAlign: 'middle', borderRadius: '15px' }}
  //                 />
  //               </a>
  //             );
  //           } else if (part.type === 'lineBreak') {
  //             return <br key={idx} />;
  //           } else if (part.type === 'jsx') {
  //             return (
  //               <div key={idx} dangerouslySetInnerHTML={{ __html: part.content }} />
  //             );
  //           } else {
  //             return null;
  //           }
  //         })}
  //       </p>
  //     </div>
  //   );
  // }





  useEffect(() => {
    if (!rendering.includes(id.id)){
      return
    }
    const interval = setInterval(() => {
      if (currentPartIndex == parts.length) {
        clearInterval(interval); // Stop interval when all parts are rendered
        removeFromRendering(id.id); // Trigger unmount logic
        clearInterval(interval);
        return
      }
      // console.log("PARTS IS")
      // console.log(currentPartIndex, parts.length)
      const currentPart = parts[currentPartIndex];
      if (currentPart.type === 'text') {
        // Append next character of the current text part
        const nextChar = currentPart.content[charInCurrentPart];
        setDisplayedContent((prev) => [
          ...prev,
          {
            type: 'text',
            content: nextChar,
            color: currentPart.color || 'inherit',
            font: currentPart.font || 'inherit',
            size: currentPart.size || 'inherit',
            effect: currentPart.effect || 'none',
          },
        ]);
        setCharInCurrentPart((prev) => prev + 1);

        // Move to the next part if the current text is complete
        if (charInCurrentPart + 1 >= currentPart.content.length) {
          setCurrentPartIndex((prev) => prev + 1);
          setCharInCurrentPart(0);
        }
      } 
      


      else if (currentPart.type === 'updateInput') {
        // Append next character of the current text part
        const nextChar = currentPart.content[charInCurrentPart];
        setDisplayedContent((prev) => [
          ...prev,
          {
            type: 'updateInput',
            content: nextChar,
            color: currentPart.color || 'inherit',
            font: currentPart.font || 'inherit',
            size: currentPart.size || 'inherit',
          },
        ]);
        setCharInCurrentPart((prev) => prev + 1);

        // Move to the next part if the current text is complete
        if (charInCurrentPart + 1 >= currentPart.content.length) {
          setCurrentPartIndex((prev) => prev + 1);
          setCharInCurrentPart(0);
        }
      }



      
      else {
        // Directly append non-text parts (link, image, etc.)
        setDisplayedContent((prev) => [...prev, currentPart]);
        setCurrentPartIndex((prev) => prev + 1);
      }
    }, 15); // Typing speed (15ms per character)

    return () => {
      clearInterval(interval); // Cleanup interval on unmount
    };
  }, [currentPartIndex, charInCurrentPart, parts, id.id, removeFromRendering]);

  return (
    <div>
      <p>
        {rendering.includes(id.id) ? 
         <>{displayedContent.map((part, idx) => {
          if (part.type === 'text') {
            return (
              <span
                key={idx}
                style={{
                  color: part.color,
                  fontSize: part.size,
                  fontFamily: part.font,
                  fontWeight: part.effect === 'bold' ? 'bold' : 'normal',
                  fontStyle: part.effect === 'italic' ? 'italic' : 'normal',
                  textDecoration: part.effect === 'underline' ? 'underline' : 'none',
                  verticalAlign: 'bottom'

                }}
              >
                {part.content}
              </span>
            );
          } else if (part.type === 'updateInput') {
            return (
              <InputUpdate
                key={idx}
                style={{
                  color: part.color,
                  fontSize: part.size,
                  fontFamily: part.font,
                  // fontWeight: part.effect === 'bold' ? 'bold' : 'normal',
                  // fontStyle: part.effect === 'italic' ? 'italic' : 'normal',
                  // textDecoration: part.effect === 'underline' ? 'underline' : 'none',
                  verticalAlign: 'bottom'
                }}
                onClick={() => updateInput(part.replacementInput)}
              >
                {part.content}
              </InputUpdate>
            );
          } else if (part.type === 'link') {
            return (
              <LinkTest key={idx}>
                <a
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: part.color || 'blue', transitionDuration: '200ms' }}
                >
                  {part.content}
                </a>
              </LinkTest>
            );
          // } else if (part.type === 'image') {
          //   return (
          //     <a
          //       key={idx}
          //       href={part.href}
          //       target="_blank"
          //       rel="noreferrer"
          //       style={{ display: 'block', maxWidth: '150px' }}
          //     >
          //       <img
          //         src={part.src}
          //         alt={part.alt}
          //         style={{ maxWidth: '150px', margin: '10px', borderRadius: '15px' }}
          //       />
          //     </a>
          //   );
          } else if (part.type === 'lineBreak') {
            return <br key={idx} />;
          } else if (part.type === 'jsx') {
            return (
              <div key={idx} dangerouslySetInnerHTML={{ __html: part.content }} />
            );
          } else {
            return null;
          }
        })}</> 
        : 
        <>{parts.map((part, idx) => {
          if (part.type === 'text') {
            return (
              <span
                key={idx}
                style={{
                  color: part.color,
                  fontSize: part.size,
                  fontFamily: part.font,
                  fontWeight: part.effect === 'bold' ? 'bold' : 'normal',
                  fontStyle: part.effect === 'italic' ? 'italic' : 'normal',
                  textDecoration: part.effect === 'underline' ? 'underline' : 'none',
                  verticalAlign: 'bottom'
                }}
              >
                {part.content}
              </span>
            );
          }  else if (part.type === 'updateInput') {
            return (
              <InputUpdate
                key={idx}
                style={{
                  color: part.color,
                  fontSize: part.size,
                  fontFamily: part.font,
                  // fontWeight: part.effect === 'bold' ? 'bold' : 'normal',
                  // fontStyle: part.effect === 'italic' ? 'italic' : 'normal',
                  // textDecoration: part.effect === 'underline' ? 'underline' : 'none',
                  verticalAlign: 'bottom'
                }}
                onClick={() => updateInput(part.replacementInput)}
              >
                {part.content}
              </InputUpdate>
            );
          }
          else if (part.type === 'link') {
            return (
              <LinkTest key={idx}>
                <a
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: part.color || 'blue', transitionDuration: '200ms' }}
                >
                  {part.content}
                </a>
              </LinkTest>
            );
          } else if (part.type === 'image') {
            return (
              <a
                key={idx}
                href={part.href}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', maxWidth: '150px' }}
              >
                <img
                  src={part.src}
                  alt={part.alt}
                  style={{ maxWidth: '200px', margin: '10px 0px', borderRadius: '20px' }}
                />
              </a>
            );
          } else if (part.type === 'lineBreak') {
            return <br key={idx} />;
          } else if (part.type === 'jsx') {
            return (
              <div key={idx} dangerouslySetInnerHTML={{ __html: part.content }} />
            );
          } else {
            return null;
          }
        })}</>}

        {/* {displayedContent.map((part, idx) => {
          if (part.type === 'text') {
            return (
              <span
                key={idx}
                style={{
                  color: part.color,
                  fontSize: part.size,
                  fontFamily: part.font,
                  fontWeight: part.effect === 'bold' ? 'bold' : 'normal',
                  fontStyle: part.effect === 'italic' ? 'italic' : 'normal',
                  textDecoration: part.effect === 'underline' ? 'underline' : 'none',
                }}
              >
                {part.content}
              </span>
            );
          } else if (part.type === 'link') {
            return (
              <LinkTest key={idx}>
                <a
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: part.color || 'blue', transitionDuration: '200ms' }}
                >
                  {part.content}
                </a>
              </LinkTest>
            );
          } else if (part.type === 'image') {
            return (
              <a
                key={idx}
                href={part.src}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', maxWidth: '150px' }}
              >
                <img
                  src={part.src}
                  alt={part.alt}
                  style={{ maxWidth: '150px', margin: '10px', borderRadius: '15px' }}
                />
              </a>
            );
          } else if (part.type === 'lineBreak') {
            return <br key={idx} />;
          } else if (part.type === 'jsx') {
            return (
              <div key={idx} dangerouslySetInnerHTML={{ __html: part.content }} />
            );
          } else {
            return null;
          }
        })} */}
      </p>
    </div>
  );
};

export default Line;

