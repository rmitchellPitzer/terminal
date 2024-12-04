import { memo } from "react";
import { Blogpost, BlogPostContainer, BlogPostText, BlogPostTitle, BlogTimeStamp,  } from "./styles/MenuStyle";

// eslint-disable-next-line react/display-name
const Blog: React.FC =  memo(() => {
    return(<BlogPostContainer>
        <BlogPostTitle>
           Blog:
        </BlogPostTitle>
                <Blogpost>A Better Terminal Portfolio</Blogpost>|
                <BlogTimeStamp>28'th Sep 2024</BlogTimeStamp>
                <BlogPostText>Coming soon! Currently being written!..</BlogPostText>
    </BlogPostContainer>);
});

export default Blog; 