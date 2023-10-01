import axios from "axios";

//biblioteca para requisições http

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
});

export default api;
