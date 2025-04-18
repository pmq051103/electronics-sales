import { createAsyncThunk } from "@reduxjs/toolkit";
import BrandService from "../../services/brand.service";

export const fetchBrands = createAsyncThunk(
    "brand/fetchBrands",
    async (params, { rejectWithValue }) => {
      try {
        const response = await BrandService.getBrand(params);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  );


  export const addBrand = createAsyncThunk(
    "brand/addBrand",
    async (data, { rejectWithValue }) => {
      try {
        const response = await BrandService.postBrand(data);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  );
  export const fetchBrandFilter = createAsyncThunk(
    "category/fetchCategoryFilter",
    async (_,{ rejectWithValue }) => {
      try {
        const response = await BrandService.fetchBrandOption();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  );
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async({id, data}, {rejectWithValue}) =>{
      try{
          const response = await BrandService.putBrand(id, data);
          return response;
      }catch(error){
        return rejectWithValue(error.response?.data.message)
      }
  }
);

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async(id,{rejectWithValue}) =>{
      try {
        const response = await BrandService.deleteBrand(id);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data.message)
      }
  }
);





  
