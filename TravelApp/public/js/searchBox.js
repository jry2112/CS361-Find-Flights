
// Source: Adapted heavily from Amadeus's tutorial
// https://developers.amadeus.com/blog/bootstrap-flight-search-form-part-2


window.addEventListener('DOMContentLoaded', (event) => {
    const originInput = document.getElementById("origin-input");
    const originOptions = document.getElementById("origin-options");

    // For use with autocomplete
    const autocompleteTimeout = 300;
    let autocompleteTimeoutHandle = 0;
    let originCityCodes = {};

    const reset = () => {
    originInput.value = "";
    };

    const autocomplete = (input, datalist, cityCodes) => {
        clearTimeout(autocompleteTimeoutHandle);
        autocompleteTimeoutHandle = setTimeout(async () => {
        try {
            const params = new URLSearchParams({ keyword: input.value });
            const response = await fetch(`/api/autocomplete?${params}`);
            const data = await response.json();
            datalist.textContent = "";
            data.forEach((entry) => {
            cityCodes[entry.name.toLowerCase()] = entry.iataCode;
            datalist.insertAdjacentHTML(
                "beforeend",
                `<option value="${entry.iataCode}">${entry.name}</option>`
            );
            });
        } catch (error) {
            console.error(error);
        }
        }, autocompleteTimeout);
    };
    document.body.addEventListener("change", () => {
        clearTimeout(autocompleteTimeoutHandle);
    });

    originInput.addEventListener("input", () => {
        if (originInput) {
            setTimeout(() => { autocomplete(originInput, originOptions, originCityCodes) }, 500);
        }
    });

    reset();
});

