const API = 'https://economia.awesomeapi.com.br/json/all';

const fetchAPI = () => fetch(API)
  .then((response) => response.json())
  .then((rates) => rates);

export default fetchAPI;
