// API/GivenApi.js

export function requestApi(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
