// Global variables
var countryData = null;

//Fetching the data from public API
function fetchCountries() {
    let searchText = document.getElementById('searchText').value;

    if (countryData == null) {
        fetch("https://restcountries.eu/rest/v2?name='searchText'")
            .then(res => res.json())
            .then(data => initialize(data))
            .catch(err => console.log("Error:", err));
        } else
        initialize(countryData);
}

//creating the list of countries based on search criteria
function initialize(data) {
    let countryList = document.getElementById('countryList');
    countryList.innerHTML = '';
    console.log(data);
    // store the fetched data to 'countryData' variable
    countryData = data;
    searchText = document.getElementById('searchText').value;

    data.forEach(country => {
        if (country.name.toLowerCase().indexOf(searchText.toLowerCase()) == 0) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(country.name));
            countryList.appendChild(li);
            li.addEventListener("click", function () {
                addToHistory(country.name);
                document.getElementById('searchText').value = country.name;
                document.getElementById('countryList').innerHTML = '';

            }, false);
        }

        if (searchText.length == 0) {
            countryList.innerHTML = '';
        }

    })
}

//Adding the history list to History table
function addToHistory(name) {
    table = document.getElementById("table1");
    var tr = document.createElement('tr');
    tr.setAttribute("id", name);
    td = document.createElement('td');
    td.append(name);
    td.setAttribute("class", "col1");
    tr.append(td);
    tdDate = document.createElement('td');
    tdDate.append(new Date().toISOString().slice(0, 10) + "," + new Date().getHours() + ":" + new Date().getMinutes());
    tdDate.setAttribute("class", "col2");
    tr.append(tdDate);
    td1 = document.createElement('td');
    td1.append("X");
    td1.setAttribute("class", "delete-btn");
    td1.addEventListener("click", function () {
        table.removeChild(tr);
    }, false);
    tr.append(td1);

    table.append(tr);
}

//Removing the data from search history
function removeAllHistory() {
    table1 = document.getElementById("table1");

    var tableRows = table1.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x = rowCount - 1; x >= 0; x--) {
        table1.removeChild(tableRows[x]);
    }

    document.getElementById('searchText').value = '';
}


