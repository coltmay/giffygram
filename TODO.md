## Register EventListener

Before we write the eventListener, consider what needs to happen. 
1. User completes register form
1. Click submit button
1. Collect the user information into an object
1. Use `POST` with the user object to add the user to the database.
1. Use the response to `setLoggedInUser` in the DataManager AND
1. Set the user in the `sessionStorage`
1. Invoke `startGiffyGram`

> main.js
```js
applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value
    }
    registerUser(userObject)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    })
  }
})

```

In the `DataManager` we need to create a function that `POST` a new user to the users table. This returns an object with the user's information including the `id`.

> scripts/data/DataManager.js

```js
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
    setLoggedInUser(parsedUser);
    return getLoggedInUser();
  })
}
```
## Get Posts with User Information
Now that we have multiple users, we want to know the author of a post. Refactor the `getPosts` method and use the `json-server` feature to expand on the user.

> scripts/data/DataManager.js
```js
export const getPosts = () => {
  const userId = getLoggedInUser().id
  return fetch(`http://localhost:8088/posts?_expand=user`)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("data with user", parsedResponse)
      postCollection = parsedResponse
      return parsedResponse;
    })
}
```

## Practice - author name
Now that you have user information tied to each post, add an element to the `Post` displaying the author's name.

## Practice - author can edit
Using your mad javascript skills, only allow authors to edit their own posts. Refactor the `Post` to only display the edit and delete buttons if the post belongs to the logged in user. You will use a conditional statement.

## Practice - json-server filter
As a code ninja, add a button to view only the logged in user's posts. Add a method to the DataManager to retrieve only the logged in user's posts. Refer to the [documentation for json-server](https://www.npmjs.com/package/json-server).

## Practice 
Your friends have asked if they can use your journal app. Include login and register functionality. You may also need to refactor the database calls to include a userId and only show posts related to the logged in user. Edits can only be made to the posts related to the user.

### Bonus #1
Allow users that are not logged in to have limited functionality like viewing other member's posts The ability to save a GiffyGram requires a login.

### Bonus #2
Refactor the login and register components into one form. If a user is not found, automatically register the user and display the app.