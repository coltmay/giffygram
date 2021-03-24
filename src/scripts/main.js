import {
    // User functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    getLoggedInUser, logoutUser, setLoggedInUser, loginUser,
    // Post functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    getPosts, getSinglePost, usePostCollection, createPost, updatePost, deletePost
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
} from "./data/DataManager.js";
import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { PostList } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { PostEntry } from "./feed/PostEntry.js";
import { PostEdit } from "./feed/PostEdit.js";
import { Footer } from "./nav/FooterBar.js";

/*===========================================
~~~~~~~~~ELEMENT FOR EVENT LISTENERS~~~~~~~~~
===========================================*/
//* Defines application element on main, will be used for other elements via event bubbling
const applicationElement = document.querySelector("main");

/*===========================================
~~~~~~~~~~~~~~~ELEMENT DISPLAYS~~~~~~~~~~~~~~
===========================================*/
//* Display Navigation Bar
const showNavBar = () => {
    const navElement = document.querySelector("nav");
    navElement.innerHTML = NavBar();
}

//* Display New Post Entry Form To DOM
const showPostEntry = () => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

//* Displays All Posts In Database To DOM.
const showPostList = () => {
    const postElement = document.querySelector(".postList");
    getPosts()
        .then((allPosts) => {
            postElement.innerHTML = PostList(allPosts.reverse());
        })
}

//* Displays The Edit Form
const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
}

//* Displays The Updated Post List From Database, After Editing
const displayUpdatePost = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id.startsWith("updatePost")) {
            const postId = event.target.id.split("__")[1];
            // Collect all the details into an object
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

//* Display Footer Bar
const showFooter = () => {
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}


/*===========================================
~~~~~~~~~~BUTTON LISTENING FUNCTIONS~~~~~~~~~
===========================================*/
// TODO Allows Home Logo To Take User To Main Page
const clickHomeButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "homeButton") {
            // todo Change later...
            console.log("Home")
        }
    })
}

// TODO Allows Pen Image To Take User To Messages
const clickMessageButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "directMessageIcon") {
            // todo Change later...
            console.log("Message")
        }
    })
}

// TODO Allows User To Register
const clickRegisterButton = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
    })
}

//* Allows User To Login Via Login Button
const clickLoginButton = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id === "login__submit") {
            const userObj = {
                name: document.querySelector("input[name='name']").value,
                email: document.querySelector("input[name='email']").value
            }
            //! Will not work until loginUser is created
            loginUser(userObj)
                .then(dbUserObj => {
                    if (dbUserObj) {
                        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                        startGiffyGram();
                    } else {
                        const entryElement = document.querySelector(".entryForm");
                        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p>
                                                    ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
                    }
                })
        }
    })
}

//* Allows User To Logout Via Logout Link
const clickLogoutButton = () => {
    applicationElement.addEventListener("click", event => {
        if (event.target.id === "logout") {
            logoutUser();
            sessionStorage.clear();
            checkForUser();
        }
    })
}

//* Allows Submit Button To Add Post To Database and Display
const clickSubmitButton = () => {
    applicationElement.addEventListener("click", event => {
        event.preventDefault();
        if (event.target.id === "newPost__submit") {
            //collect the input values into an object to post to the DB
            const title = document.querySelector("input[name='postTitle']").value
            const url = document.querySelector("input[name='postURL']").value
            const description = document.querySelector("textarea[name='postDescription']").value
            const postObject = {
                title: title,
                imageURL: url,
                description: description,
                //! Test code, was previously a hard coded 1.
                userId: getLoggedInUser().id,
                timestamp: Date.now()
            }
            createPost(postObject)
                .then(response => {
                    showPostList();
                })
        }
    })
}

//* Allows Edit Button To Edit Post Holding Button
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


//* Allows Delete Button To Delete Post Holding Button.
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

/*===========================================
~~~~~~~~~SELECTOR LISTENING FUNCTIONS~~~~~~~~
===========================================*/
//* Listens for a year selection in footer, then invokes showFilteredPosts
const selectYear = () => {
    applicationElement.addEventListener("change", event => {
        if (event.target.id === "yearSelection") {
            const yearAsNumber = parseInt(event.target.value)
            showFilteredPosts(yearAsNumber);
        }
    })
}

//* Filters all posts by year selected from selectYear.
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

/*===========================================
~~~~~~~~~~~~~~~~~~~STARTUP~~~~~~~~~~~~~~~~~~~
===========================================*/
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

//* Checks Session ID for User, if not, prompts Login/Register
const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));

        startGiffyGram();
    } else {
        clickRegisterButton();
        clickLoginButton();
        showLoginRegister();
    }
}

// Displays Login and Register Page, Invoked By checkForUser
const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm")

    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;

    const postElement = document.querySelector(".postList");
    postElement.innerHTML = "";
}

checkForUser();