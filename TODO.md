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