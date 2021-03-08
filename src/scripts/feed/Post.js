export const Post = (postObject) => {
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p class="post__description">${postObject.description}</p>
        <p class="post__details">Posted by User #${postObject.userId} on ${postObject.timestamp}</p>
      </section>
    `
}