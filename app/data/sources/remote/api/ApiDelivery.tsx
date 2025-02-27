import axios from "axios";

const ApiDelivery = axios.create({
    baseURL: "http://localhost:8080/api/ropa",
    headers: {
        "Content-Type": "application/json",
    }
})

export { ApiDelivery };
