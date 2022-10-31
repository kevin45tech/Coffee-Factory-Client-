import axios from "axios";
import toast from "react-hot-toast";
import * as types from "../Types";
import { authToken, getAllFarmers } from "./auth";
import { getErrors } from "./errors";
const PAYMENT_API = "http://localhost:4000/payment";
// get payable farmers

export const getPayableFarmers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${PAYMENT_API}/payable-farmers`);
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_PAYABLE_FARMERS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// make payment
export const makePayment = (farmerId) => async (dispatch) => {
  try {
    const response = await axios.get(`${PAYMENT_API}/pay/${farmerId}`);
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.PAYMENT_SUCCESS,
        payload: data,
      });
      toast.success(data.message);
      dispatch(getAllFarmers());
    }
  } catch (error) {
    dispatch(getErrors(error.response.data.message, types.PAYMENT_FAIL));
    toast.error(error.response.data.message);
    // console.log(error);
  }
};
// get all transactions
export const getAllTransactions = () => async (dispatch) => {
  try {
    const response = await axios.get(`${PAYMENT_API}/transactions`);
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_TRANSACTIONS,
        payload: data,
      });
    }
  } catch (error) {
    // console.log(error);
  }
};
// get single transaction
export const getSingleTransaction = (farmerId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${PAYMENT_API}/farmer-transaction/${farmerId}`
    );
    const data = await response.data;
    if (data) {
      dispatch({
        type: types.GET_SINGLE_TRANSACTION,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
