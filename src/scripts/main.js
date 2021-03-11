import { getPosts, usePostCollection, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { PostEntry } from "./feed/PostEntry.js";
import { Footer } from "./nav/FooterBar.js";


const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts()
        .then((allPosts) => {
            postElement.innerHTML = PostList(allPosts.reverse());
        })
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

const showFooter = () => {
    //Get a reference to the location on the DOM where the footer will display
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}

const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

//  Defines application element on main, will be used for other elements via event bubbling
const applicationElement = document.querySelector("main");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
})

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

// Event for clicking on home.
const clickHomeButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "homeButton") {
            // Change later...
            console.log("Home")
        }
    })
}

// Event for clicking on message.
const clickMessageButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "directMessageIcon") {
            // Change later...
            console.log("Message")
        }
    })
}

// Event for clicking on logout.
const clickLogoutButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "logout") {
            // Change later...
            console.log("Logout")
        }
    })
}

const clickEditButton = () => {
    applicationElement.addEventListener("click", (event) => {
        if (event.target.id.startsWith("edit")) {
            console.log("post clicked", event.target.id.split("--"))
            console.log("the id is", event.target.id.split("--")[1])
        }
    })
}


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

// Event for selecting the year in the footer.
const selectYear = () => {
    applicationElement.addEventListener("change", event => {
        if (event.target.id === "yearSelection") {
            const yearAsNumber = parseInt(event.target.value)
            showFilteredPosts(yearAsNumber);
        }
    })
}

const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showPostEntry();
    showFooter();
    clickHomeButton();
    clickMessageButton();
    clickLogoutButton();
    clickEditButton();
    selectYear();
}

startGiffyGram();