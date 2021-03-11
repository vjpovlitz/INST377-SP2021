async function windowsActions() {
  function findMatches(wordToMatch, food) {
    return food.filter(any => {
        const regex = new RegExp(wordToMatch, 'gi');   
        return any.name.match(regex)
    });
  }
  


  function displayMatches() {
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const name = place.name.replace(regex, `<span class="hl">${this.value}</span>`);
    const type = place.category.replace(regex, `<span class="hl">${this.value}</span>`);
    const address = place.address_line_1.replace(regex, `<span class="hl">${this.value}</span>`);
    const city = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const zip = place.zip.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
        <ul>
            <li>-
                <span class="name">${name}</span>
                <span class="name">${type}</span>
                <span class="name">${address}</span>
                <span class="name">${city}</span>
                <span class="name">${zip}</span>
            </li>
        </ul>
    `;
    }).join('');
    results.innerHTML = html;
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
