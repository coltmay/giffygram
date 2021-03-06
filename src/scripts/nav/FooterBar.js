export const Footer = () => {

    // HTML to be returned to GiffyGram component
    return `
        <footer class="footer">
            <button id="userPostButton">Posts Only By Me</button>
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">0</span>
            </div>
        </footer>
    `
}