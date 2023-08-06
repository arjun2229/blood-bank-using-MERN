import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import {toast} from 'react-toastify'

export const userLogin=createAsyncThunk(
    'auth/Login',
    async({role,email,password},{rejectedWithValue})=>{
        try {
            const {data}=await API.post('/auth/login',{role,email,password})
            //store token
            if(data.success){
                localStorage.setItem('token',data.token)
                alert(data.message)
                window.location.replace("/");

            }
            return data;
        } catch (error) {
            if(error.response&& error.response.data.message){
                return rejectedWithValue(error.response.data.message)
            }else{
                return rejectedWithValue(error.message)
            }
            
        }
    }
)

//register
export const userRegister=createAsyncThunk(
    "auth/register",
    async({
        name,role,email,password,phone,organisationName,address,hospitalName,website,
    },
    {rejectedWithValue})=>{
        try {
            const {data}=await API.post("/auth/register",{
                name,role,email,password,phone,organisationName,address,hospitalName,website,
            });
            if(data.success){
                // toast.success(data.message);
                alert(data.message)
                window.location.replace("/login");
            }
        } catch (error) {
            if(error.response&& error.response.data.message){
                return rejectedWithValue(error.response.data.message)
            }else{
                return rejectedWithValue(error.message)
            }
        }
    }
)


//current user
export const getCurrentUser=createAsyncThunk(
    'auth/getCurrentUser',
    async({rejectedWithValue})=>{
        try {
            const res=await API.get("/auth/current-user");
            if(res?.data){
                return res?.data;
            }
        } catch (error) {
            if(error.response&& error.response.data.message){
                return rejectedWithValue(error.response.data.message)
            }else{
                return rejectedWithValue(error.message)
            }
        }
    }
)