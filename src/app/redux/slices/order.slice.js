import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../services/order.service";
import { setLoading } from "./loading.slice";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async ( params , { dispatch, rejectWithValue }) => {
      try {
        dispatch(setLoading(true));
        const response = await OrderService.fetchOrders(params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }finally{
        dispatch(setLoading(false));
      }
    }
  );
  
export const updateOrderStatus = createAsyncThunk(
  "order/fetchOrders",
  async ( {id,data} , { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await OrderService.patchOrder(id,data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }finally{
      dispatch(setLoading(false));
    }
  }
);
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrders",
  async ( id , { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await OrderService.fetchOrderById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message);
    }finally{
      dispatch(setLoading(false));
    }
  }
);