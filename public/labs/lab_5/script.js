async function windowsActions() {
  function findMatches(wordToMatch, food) {
    return food.filter(any => {
        const regex = new RegExp(wordToMatch, 'gi');   
        return any.name.match(regex)
    });
  }

  console.log('window loaded');
  const form = document.querySelector('.userform');
  const search = document.querySelector('#search_value');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();
  //console.table(data[1]);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submit fired', search.value);
    // eslint-disable-next-line camelcase
    food_list = findMatches(search.value.toUpperCase(),data);
    console.log(food_list[1]);
    // eslint-disable-next-line max-len
    //const filtered = data.filter((any) => any.name.toUpperCase() === search.value.toUpperCase());
    food_list.forEach((item) => {
      const appendItem = document.createElement('li');
      appendItem.innerText = item.name + ' ' + item.address_line_1 + ' ' +  item.zip;
      targetList.append(appendItem);
    });
  });
}

window.onload = windowsActions;
