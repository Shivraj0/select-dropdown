function getDataElement(data) {
    const dataElement = document.createElement('td');
    dataElement.innerText = data;

    return dataElement;
}

function renderData(selectItem) {
    const tableElement = document.getElementById('dataTable').querySelector('tbody');
    tableElement.innerHTML = '';

    const rowElement = document.createElement('tr');

    rowElement.appendChild(getDataElement(selectItem.selectedOptions[0].dataset.country));
    rowElement.appendChild(getDataElement(selectItem.selectedOptions[0].dataset.countrycode));
    rowElement.appendChild(getDataElement(selectItem.value));

    tableElement.appendChild(rowElement);
}

function fetchData() {
    const response = fetch('https://api.covid19api.com/country/south-africa/status/confirmed');

    const res = response.then(res => res.json());

    res.then(apiData => {
        console.log(apiData);

        let selectElement = document.getElementById('country');
        
        const totalItems = 5;
        for(let i = 0 ; i < totalItems ; i++) {            
            let optionElement = document.createElement('OPTION');
            const value = apiData[i].Date;
            optionElement.innerText = value; // Kept this value in options because for the first few results this attribute was the only differentiating value than the rest.
            optionElement.setAttribute('value', value);
            optionElement.setAttribute('data-country', apiData[i].Country);
            optionElement.setAttribute('data-countrycode', apiData[i].CountryCode);
            selectElement.appendChild(optionElement);
            renderData(document.querySelector('select'));
        }

    });
}

function stickTable() {    
    document.getElementById('stickOnScroll').style.position = 'absolute';
    document.getElementById('stickOnScroll').style.top = `${window.scrollY}px`;
}

function scrollStick() {
    document.addEventListener('scroll', stickTable)
}

function registerEvents() {
    fetchData();
    scrollStick();
}

document.addEventListener('load', registerEvents());