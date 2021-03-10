import { getPosts, usePostCollection } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { Footer } from "./nav/FooterBar.js";


const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts()
        .then((allPosts) => {
            postElement.innerHTML = PostList(allPosts);
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

//  Defines application element on main, will be used for other elements via event bubbling
const applicationElement = document.querySelector("main");

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
    showFooter();
    clickHomeButton();
    clickMessageButton();
    clickLogoutButton();
    clickEditButton();
    selectYear();
}

startGiffyGram();