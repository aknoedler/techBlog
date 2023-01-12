const signupFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('#comment-body').value.trim();
  const urlArray = document.URL.split('/');
  const post_id = urlArray[urlArray.length - 1];

  if (body) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ body, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/posts/${post_id}`);
    } else {
      alert('Failed to create comment.');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', signupFormHandler);