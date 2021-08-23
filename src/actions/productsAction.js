import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {

    const res = await fetch("http://172.25.56.11:5000/api/products");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
};