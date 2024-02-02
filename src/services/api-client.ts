import axios, { CanceledError } from "axios";

export default axios.create({ // configuration
    baseURL: "https://jsonplaceholder.typicode.com",
})

export {CanceledError};