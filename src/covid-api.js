function fetchData(country) {
    const response = fetch(`https://api.covid19api.com/country/${country}/status/confirmed`);

    return response.then(res => res.json());
}

function getDataElement(data) {
    const dataElement = document.createElement('td');
    dataElement.innerText = data;

    return dataElement;
}

function renderData(selectItem) {
    const country = selectItem.value;
    const getCachedValue = sessionStorage.getItem(country);
    if(getCachedValue === null) {
        const res = fetchData(country);
        res.then(apiData => {
            console.log(apiData);
            populateTable(apiData);
            sessionStorage.setItem(country, JSON.stringify(apiData));
        });
    } else {
        const data = JSON.parse(getCachedValue);
        populateTable(data);

        console.log(JSON.parse(getCachedValue)); // Check console for current country data.
    }

    sessionStorage.setItem("country", country);
}

function populateTable(data) {
    const tableElement = document.getElementById('dataTable').querySelector('tbody');
    tableElement.innerHTML = '';
    
    const totalItems = 5;
    for(let i = 0 ; i < totalItems ; i++) {         
        const rowElement = document.createElement('tr');

        const dateTimeArray = data[i].Date.split('T');
        const date = dateTimeArray[0].split('-').reverse().join('-');
        const time = dateTimeArray[1].split('', 8).join('');

        rowElement.appendChild(getDataElement(data[i].Country));
        rowElement.appendChild(getDataElement(data[i].CountryCode));
        rowElement.appendChild(getDataElement(data[i].Cases));
        rowElement.appendChild(getDataElement(data[i].Status));
        rowElement.appendChild(getDataElement(date));
        rowElement.appendChild(getDataElement(time));

        tableElement.appendChild(rowElement);
    }
}

function registerEvents() {

    const country = {
        value: 'south-africa'
    }
    
    const currSessionCountry = sessionStorage.getItem('country');
    
    if(currSessionCountry) {
        country.value =  currSessionCountry;
    }

    renderData(country);
}

document.addEventListener('load', registerEvents());
