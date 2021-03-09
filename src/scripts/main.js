import { getPosts } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { FooterBar } from "./footer/FooterBar.js";
// import { clickLogoutButton } from "./buttons/logout.js";

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

const showFooterBar = () => {
    //Get a reference to the location on the DOM where the footer will display
    const footerElement = document.querySelector("footer");
	footerElement.innerHTML = FooterBar();
}

//  Defines application element on main, will be used for other events
const applicationElement = document.querySelector("main");

//  Event for clicking on main, null
applicationElement.addEventListener("click", event => {
    return null;
})

// Event for clicking on logout.
const clickLogoutButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "logout") {
            console.log("Logout")
        }
    })
}

const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFooterBar();
    clickLogoutButton();
}

startGiffyGram();