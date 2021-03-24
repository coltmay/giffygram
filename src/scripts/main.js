import { getPosts, getSinglePost, usePostCollection, createPost, deletePost, updatePost, getLoggedInUser } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { Footer } from "./nav/FooterBar.js";

//  Defines application element on main, will be used for other elements via event bubbling
const applicationElement = document.querySelector("main");

// Display Navigation Bar
const showNavBar = () => {
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

// Display New Post Fields To DOM
const showPostEntry = () => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

// Displays All Posts In Database To DOM.
const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts()
        .then((allPosts) => {
            postElement.innerHTML = PostList(allPosts.reverse());
        })
}

// Display Footer Bar
const showFooter = () => {
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}

// ! Allows Home Logo To Take User To Main Page
const clickHomeButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "homeButton") {
            // Change later...
            console.log("Home")
        }
    })
}

// ! Allows Pen Image To Take User To Messages
const clickMessageButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "directMessageIcon") {
            // Change later...
            console.log("Message")
        }
    })
}

// ! Allows User To Logout Via Logout Link
const clickLogoutButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "logout") {
            // Change later...
            console.log("Logout")
        }
    })
}

// Allows Submit Button To Add Post To Database and Display
const clickSubmitButton = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id === "newPost__submit") {
            //collect the input values into an object to post to the DB
            const title = document.querySelector("input[name='postTitle']").value
            const url = document.querySelector("input[name='postURL']").value
            const description = document.querySelector("textarea[name='postDescription']").value
            //we have not created a user yet - for now, we will hard code `1`.
            //we can add the current time as well
            const postObject = {
                title: title,
                imageURL: url,
                description: description,
                userId: 1,
                timestamp: Date.now()
            }
            // be sure to import from the DataManager
            createPost(postObject)
                .then(response => {
                    showPostList();
                })
        }
    })
}

// Allows Edit Button To Edit Post Holding Button
const clickEditButton = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id.startsWith("edit")) {
            const postId = event.target.id.split("--")[1];
            getSinglePost(postId)
                .then(response => {
                    showEdit(response);
                })
        }
    })
}

// Function That Displays The Edit Form
const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
}

// Displays The Updated Post List From Database, After Editing
const displayUpdatePost = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id.startsWith("updatePost")) {
            const postId = event.target.id.split("__")[1];
            //collect all the details into an object
            const title = document.querySelector("input[name='postTitle']").value
            const url = document.querySelector("input[name='postURL']").value
            const description = document.querySelector("textarea[name='postDescription']").value
            const timestamp = document.querySelector("input[name='postTime']").value

            const postObject = {
                title: title,
                imageURL: url,
                description: description,
                userId: getLoggedInUser().id,
                timestamp: parseInt(timestamp),
                id: parseInt(postId)
            }

            showPostEntry();

            updatePost(postObject)
                .then(response => {
                    showPostList();
                })
        }
    })
}

// Allows Delete Button To Delete Post Holding Button.
const clickDeleteButton = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id.startsWith("delete")) {
            const postId = event.target.id.split("--")[1];
            deletePost(postId)
                .then(response => {
                    showPostList();
                })
        }
    })
}

// A simple event that listens for a year selection, then invokes showFilteredPosts
const selectYear = () => {
    applicationElement.addEventListener("change", event => {
        if (event.target.id === "yearSelection") {
            const yearAsNumber = parseInt(event.target.value)
            showFilteredPosts(yearAsNumber);
        }
    })
}

// Filters all posts by year selected from selectYear.
const showFilteredPosts = (year) => {
    // Get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    // Filter the date
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost;
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}


const startGiffyGram = () => {
    showNavBar();
    showPostEntry();
    showPostList();
    showFooter();
    clickHomeButton();
    clickMessageButton();
    clickLogoutButton();
    clickSubmitButton();
    clickEditButton();
    displayUpdatePost();
    clickDeleteButton();
    selectYear();
}

startGiffyGram();