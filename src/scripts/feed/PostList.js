import { Post } from "./Post.js";

export const PostList = (allPosts) => {
    let postHTML = "";
    //Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
    for (const postObject of allPosts) {
        postObject.timestamp = new Date(postObject.timestamp);
        postHTML += Post(postObject)
    }
    return postHTML;
}