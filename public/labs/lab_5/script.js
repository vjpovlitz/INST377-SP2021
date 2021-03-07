async function windowsActions() {
  console.log('window loaded');
  const form = document.querySelector('.userform');
  const search = document.querySelector('#name');

  search.addEventListener('input', (event) => {
    console.log('input', event.target.value);
  });
}

window.onload = windowsActions;



