import axios from './axios.js'

// const API = 'http://localhost:3018/api'

export const registerRequest =async (user) => axios.post(`/register`,user)

export const loginRequest = async(user) =>axios.post(`/login`, user)

export const verifyTokenRequest= async()=> axios.get('/auth/verify')