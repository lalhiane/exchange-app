const ApiKey = "e42522eaca814d4c874a17f00a5a9c6a";

const currenciesSelect = document.getElementById("currencies-select");

const resultContainer = document.querySelector(".result-container");

const exchangeForm = document.querySelector(".exchange-form");

const exchangeInput = document.getElementById("exchange-input");

async function getData(url) {

    const response = await fetch(url);

    const data = await response.json();

    return data;

}

getData(`https://api.currencyfreaks.com/latest?apikey=${ApiKey}&format=json`)

.then(data => {

    const rates = data.rates;

    exchange(rates);

    return rates;

}).then(rates => {

    const currencies = Object.keys(rates).sort();

    currencies.shift();

    generate_currencies_options(currencies);

});

function generate_currencies_options(currencies) {

    currencies.forEach(currency => {
        
        const option = document.createElement("option");

        option.value = currency;

        option.innerHTML = currency;

        currenciesSelect.appendChild(option);

    });

}

function exchange(rates) {

    exchangeForm.addEventListener("submit", function (e) {

        e.preventDefault();
        
        if (exchangeInput.value !== "") {

            result(rates, currenciesSelect.value, exchangeInput.value);

            exchangeInput.value = "";
    
            exchangeInput.focus();

        } else {

            console.log("hahaha")

            errorMsg("Empty Input")

        }
    
    });

}

function result(rates, currency, number) {

    resultContainer.innerHTML = "";

    const resultEl = document.createElement("div");

    resultEl.className = "result";

    const rate = +rates[currency];

    const fixedRate = rate.toFixed(2) * +exchangeInput.value;

    resultEl.innerHTML = `
        <div>
            <span class="inputed-number">${number}</span> USD
        </div>
        <i class="fas fa-arrows-turn-right arrow"></i>
        <div>
            <span class="number-result">${fixedRate}</span>
            <span class="choosen-currency">${currency}</span>
        </div>
    `;
    
    resultContainer.appendChild(resultEl);

}

function errorMsg(error) {

    resultContainer.innerHTML = "";

    const errorEl = document.createElement("p");

    errorEl.className = "error";

    errorEl.innerHTML = error;

    resultContainer.appendChild(errorEl);
    
    window.setTimeout(() => errorEl.remove(), 3000);

}