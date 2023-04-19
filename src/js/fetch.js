
// // function fetch в отдельный файл для файла №16
// export default function fetchCountries(inputName) {
//     const url = `https://restcountries.com/v3.1/name/${inputName}?field=name,capital,population,flags,languages`;
//     return fetch(url).then((response) => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         const dataJson = response.json();
//         console.log(dataJson);
//         return dataJson;
//     });
// }

// // export default fetchCountries

// function fetch в отдельный файл для файла №16
export function fetchCountries(inputName) {
    const url = `https://restcountries.com/v3.1/name/${inputName}?field=name,capital,population,flags,languages`;
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        const dataJson = response.json();
        console.log(dataJson);
        return dataJson;
    });
}
