import { getLoggedInUser } from "../data/DataManager.js";

export const Post = (postObject) => {
	// Modify string to capitalize first character in name.
	let capitalizedUserName = postObject.user.name.charAt(0).toUpperCase() + postObject.user.name.slice(1);
	// Grab current user's id to compare to userId of post.
	let currentUser = getLoggedInUser();
	// If statement to check user against post user, if equal, post will additionally display edit and delete buttons.
	if (currentUser.id === postObject.userId) {
		return `
        <section class="post">
        	<header>
        		<h2 class="post__title">${postObject.title}</h2>
        	</header>
        	<img class="post__image" src="${postObject.imageURL}" />
        	<p class="post__description">${postObject.description}</p>
        	<p class="post__details">Posted by ${capitalizedUserName} on ${postObject.timestamp}</p>
        	<div><button id="edit--${postObject.id}">Edit</button></div>
        	<div><button id="delete--${postObject.id}">Delete</button></div>
        </section>`
	} else {
		return `
    	<section class="post">
        	<header>
            	<h2 class="post__title">${postObject.title}</h2>
        	</header>
        	<img class="post__image" src="${postObject.imageURL}" />
        	<p class="post__description">${postObject.description}</p>
        	<p class="post__details">Posted by ${capitalizedUserName} on ${postObject.timestamp}</p>
    	</section>`
	}
}
