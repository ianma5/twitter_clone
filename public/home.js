const postButton = document.querySelector('.post-button');
const tweetcon = document.querySelector('.tweet-container');

const formatDate = (postDate) => {
    const date = new Date(postDate);
    return date.toLocaleString('en-US');
};

async function getTweets() {
    try {
        const res = await fetch('/post');
        const tweets = await res.json();
        displayTweets(tweets);
    } catch (err) {
        console.error(err);
    }
}
function displayTweets(posts) {
    tweetcon.innerHTML = '';
    posts.forEach(tweet => {
        const div = document.createElement('div');
        div.classList.add('tweet');
        div.innerHTML = `<div class="author">${tweet.username}</div>
        <div class="textcontent">${tweet.message}</div> <div class="date">${formatDate(tweet.date)}</div>`;
        tweetcon.appendChild(div);
    })
}

postButton.addEventListener('click', async () => {
    const username = document.querySelector('.username').value
    const message = document.querySelector('.type-tweet').value

    if(!username || !message) {
        alert('Username and content are required.')
        return;
    }
    try {
        const res = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, message })
        });
        if (res.status === 201) {
            document.querySelector('.username').value = '';
            document.querySelector('.type-tweet').value = '';
            getTweets();
        } else {
            console.error(res.statusText);
        }
    } catch (err) {
        console.error(err);
    }
})


getTweets();