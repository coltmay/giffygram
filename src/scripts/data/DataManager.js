/*===========================================
~~~~~~~~~~~~~~~~~~~~USERS~~~~~~~~~~~~~~~~~~~~
===========================================*/

// Fetches all users from JSON file.
export const getUsers = () => {
    return fetch("http://localhost:8088/users")
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse;
        })
}

// An empty object that will hold the current logged in user.
let loggedInUser = {};

// Returns logged in user.
export const getLoggedInUser = () => {
    return { ...loggedInUser };
}

// Logs user out by setting loggedInUser to empty object.
export const logoutUser = () => {
    loggedInUser = {};
}

// Sets logged in user object from sessionStorage
export const setLoggedInUser = (userObj) => {
    loggedInUser = userObj;
}

// Checks if user is in database, then pulls and sets user.
export const loginUser = (userObj) => {
    return fetch (`http://localhost:8088/users?name=${userObj.name}&email=${userObj.email}`)
        .then(response => response.json())
        .then(parsedUser => {
            if (parsedUser.length > 0) {
                setLoggedInUser(parsedUser[0]);
                return getLoggedInUser();
            } else {
                return false;
            }
        })
}

export const registerUser = (userObj) => {
    return fetch(`http://localhost:8088/users`, {
    method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then(parsedUser => {
        console.log(parsedUser)
        setLoggedInUser(parsedUser);
        return getLoggedInUser();
    })
}
/*===========================================
~~~~~~~~~~~~~~~~~~~~POSTS~~~~~~~~~~~~~~~~~~~~
===========================================*/
let postCollection = [];

export const getPosts = () => {
    // Besides fetching posts from the DB, we will also be fetching the embedded user data attached to each post with `expand=user`
    return fetch("http://localhost:8088/posts?_expand=user")
    .then(response => response.json())
    .then(parsedResponse => {
        postCollection = parsedResponse;
        return parsedResponse;
    })
}

export const getSinglePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`)
        .then(response => response.json())
}

export const usePostCollection = () => {
    return [...postCollection];
}

export const createPost = (postObj) => {
    return fetch("http://localhost:8088/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
        .then(response => response.json())
}

export const updatePost = (postObj) => {
    return fetch(`http://localhost:8088/posts/${postObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
        .then(response => response.json())
        .then(getPosts)
}

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(getPosts)
}