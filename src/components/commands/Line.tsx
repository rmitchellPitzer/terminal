import React, { useState, useEffect, useContext } from 'react';
import { LinkTest } from '../styles/Test.styled';
import { termContext } from "../Terminal";

// Custom function to parse content into parts (ignoring tags for typing)
const parseContent = (text) => {
    const parts = [];
    const combinedRegex = /<color:(#\w+|[a-zA-Z]+)>(.*?)<\/color>|!\[(.*?)\]\((.*?)\)|!!\[(.*?)\]\((.*?)\)(\{color:(#\w+|[a-zA-Z]+)\})?/g;
    let lastIndex = 0;
    let match;

    while ((match = combinedRegex.exec(text)) !== null) {
        const [fullMatch, colorCode, coloredText, altText, imgSrc, linkText, linkHref, linkColorWrapper, linkColor] = match;
        const matchIndex = match.index;

        // Push plain text before the match
        if (matchIndex > lastIndex) {
            parts.push({ type: 'text', content: text.slice(lastIndex, matchIndex), color: null });
        }

        // Handle color match
        if (coloredText !== undefined) {
            parts.push({ type: 'text', content: coloredText, color: colorCode });
        }

        // Handle image match
        if (imgSrc !== undefined || altText !== undefined) {
            parts.push({ type: 'image', src: imgSrc || '', alt: altText || '' }); // Ensure altText is included
        }

        // Handle link match (with optional color)
        if (linkText !== undefined) {
            parts.push({ type: 'link', content: linkText, href: linkHref, color: linkColor || null });
        }

        // Update lastIndex to move past the current match
        lastIndex = matchIndex + fullMatch.length;
    }

    // Push remaining text after the last match
    if (lastIndex < text.length) {
        parts.push({ type: 'text', content: text.slice(lastIndex), color: null });
    }

    return parts;
};

  
// Your existing `parseContent` function remains unchanged

const Line = ({ content, id }) => {
  const { removeFromRendering, rendering } = useContext(termContext);
  if (!rendering.includes(id.id)) {
    const parts = parseContent(content); // Parse the content
    return (
      <div>
        <p>
          {parts.map((part, idx) =>
            part.type === 'text' ? (
              <span key={idx} style={{ color: part.color || 'inherit' }}>
                {part.content}
              </span>
            ) : part.type === 'image' ? (
              <a href={part.src} style={{ display: 'block', maxWidth: '150px' }} target="_blank" rel="noreferrer">
                <img
                  key={idx}
                  src={part.src}
                  alt={part.alt} // Set the alt text
                  style={{ maxWidth: '200px', padding: '20px', margin: '0px', verticalAlign: 'middle', borderRadius: '15px' }}
                />
              </a>
            ) : part.type === 'link' ? (
              <LinkTest>
                <a
                  key={idx}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: part.color || 'blue', transitionDuration: '200' }} // Apply color to the link if specified
                >
                  {part.content}
                </a>
              </LinkTest>
            ) : null
          )}
        </p>
      </div>
    );
  }

  const [displayedContent, setDisplayedContent] = useState([]); // Rendered content
  const [typingIndex, setTypingIndex] = useState(0); // Current character index
  const [currentPartIndex, setCurrentPartIndex] = useState(0); // Current part (text, image, link)
  const [charInCurrentPart, setCharInCurrentPart] = useState(0); // Character index within the current part

  const parts = parseContent(content); // Parse the content
  useEffect(() => {
    if (currentPartIndex < parts.length) {
      const currentPart = parts[currentPartIndex];

      if (currentPart.type === 'text') {
        const { content, color } = currentPart;

        if (charInCurrentPart < content.length) {
          const nextChar = content[charInCurrentPart];

          setDisplayedContent((prev) => [
            ...prev,
            { type: 'text', content: nextChar, color },
          ]);

          setCharInCurrentPart(charInCurrentPart + 1); // Move to next character
        } else {
          setCurrentPartIndex(currentPartIndex + 1); // Move to the next part (image, link, etc.)
          setCharInCurrentPart(0); // Reset for the next part
        }
      } else if (currentPart.type === 'image') {
        setDisplayedContent((prev) => [
          ...prev,
          { type: 'image', src: currentPart.src, alt: currentPart.alt },
        ]);
        setCurrentPartIndex(currentPartIndex + 1); // Move to next part after image
      } else if (currentPart.type === 'link') {
        setDisplayedContent((prev) => [
          ...prev,
          {
            type: 'link',
            content: currentPart.content,
            href: currentPart.href,
            color: currentPart.color,
          },
        ]);
        setCurrentPartIndex(currentPartIndex + 1); // Move to next part after link
      }
    } 
    // else {
    //   removeFromRendering(id.id); // Run this once the entire content has been displayed
    // }
  }, [typingIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => prev + 1); // Progress typing animation character-by-character
    }, 15); // Adjust typing speed (100ms per character)

    return () => {
      console.log("CLEARING INTERVAL AND REMOVING")
      clearInterval(interval); // Clean up interval when component unmounts
      removeFromRendering(id.id); // Run this function on unmount
    };
  }, []);

  return (
    <div>
      <p>
        {displayedContent.map((part, idx) =>
          part.type === 'text' ? (
            <span key={idx} style={{ color: part.color || 'inherit' }}>
              {part.content}
            </span>
          ) : part.type === 'image' ? (
            <a href={part.src} style={{ display: 'block', maxWidth: '150px' }} target="_blank" rel="noreferrer">
              <img
                key={idx}
                src={part.src}
                alt={part.alt} // Set the alt text
                style={{ maxWidth: '150px', margin: '10px', verticalAlign: 'middle', borderRadius: '15px' }}
              />
            </a>
          ) : part.type === 'link' ? (
            <LinkTest>
              <a
                key={idx}
                href={part.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: part.color || 'blue', transitionDuration: '200' }} // Apply color to the link if specified
              >
                {part.content}
              </a>
            </LinkTest>
          ) : null
        )}
      </p>
    </div>
  );
};

export default Line;

