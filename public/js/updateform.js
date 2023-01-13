const postFormHandler = async (event) => {
  event.preventDefault();

  const urlArray = document.URL.split('/');
  const post_id = urlArray[urlArray.length - 1];

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if (title && body) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post.');
    }
  }
};

document
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);