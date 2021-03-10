import { getPosts } from "./data/DataManager.js";
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

// Event for selecting the year in the footer.
applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)

        console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})

const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFooter();
    clickHomeButton();
    clickMessageButton();
    clickLogoutButton();
}

startGiffyGram();