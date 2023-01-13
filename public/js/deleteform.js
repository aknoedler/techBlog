const deleteButtonHandler = async (event) => {
  event.preventDefault();

  const urlArray = document.URL.split('/');
  const post_id = urlArray[urlArray.length - 1];

  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert('Failed to delete post.');
  }
};

document
  .querySelector('#delete')
  .addEventListener('click', deleteButtonHandler);