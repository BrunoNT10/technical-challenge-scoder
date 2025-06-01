import axios from 'axios'
import { io } from 'socket.io-client'

const baseURL = "http://localhost:3000"
const api = axios.create({
    baseURL: baseURL,
})

export async function listProducts () {
    const apiResponse = await api.get("/products")
    return apiResponse.data
}

export const connectWebSocket = () => {
    const socket = io(baseURL)
    socket.on("connect", () => {
        console.log("conectado")
    })
}