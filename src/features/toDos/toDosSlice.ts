import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { db } from "../../indexedDB/db";
import type { ToDo } from "../../types";

interface ToDosState {
  all: ToDo[];
  pending: ToDo[];
  completed: ToDo[];
}

const initialState: ToDosState = {
  all: [],
  pending: [],
  completed: [],
};

export const addToDo = createAsyncThunk(
  "toDos/add",
  async (toDo: ToDo, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      await db.put("to-do-list", toDo);
      dispatch(getAllToDos());
      return fulfillWithValue(toDo);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editToDo = createAsyncThunk(
  "toDos/edit",
  async (toDo: ToDo, { fulfillWithValue, rejectWithValue }) => {
    try {
      await db.put("to-do-list", toDo);
      return fulfillWithValue(toDo);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllToDos = createAsyncThunk(
  "toDos/getAll",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      return fulfillWithValue<ToDo[]>(await db.getAll("to-do-list"));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteToDo = createAsyncThunk(
  "toDos/delete",
  async (toDo: ToDo, { fulfillWithValue, rejectWithValue }) => {
    try {
      await db.delete("to-do-list", toDo.createdAt);
      return fulfillWithValue(toDo);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const toDosSlice = createSlice({
  name: "toDos",
  initialState,
  reducers: {
    filterPending: (state) => {
      state.pending = state.all.filter((toDo) => toDo.status === "pending");
    },
    filterCompleted: (state) => {
      state.completed = state.all.filter((toDo) => toDo.status === "completed");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToDo.rejected, (_, action) => {
        console.log(action.error);
      })
      .addCase(getAllToDos.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(editToDo.fulfilled, (state, action) => {
        const updatedIdx = state.all.findIndex(
          (toDo) => toDo.createdAt === action.payload.createdAt
        );
        state.all[updatedIdx] = action.payload;
        state.pending = state.all.filter((toDo) => toDo.status === "pending");
        state.completed = state.all.filter(
          (toDo) => toDo.status === "completed"
        );
      })
      .addCase(deleteToDo.fulfilled, (state, action) => {
        const deletedIdx = state.all.findIndex(
          (toDo) => toDo.createdAt === action.payload.createdAt
        );
        state.all.splice(deletedIdx, 1);
      });
  },
});

export const selectAllToDos = (state: RootState) => state.toDos.all;
export const selectCompletedToDos = (state: RootState) => state.toDos.completed;
export const selectPendingToDos = (state: RootState) => state.toDos.pending;
export const filterPending = toDosSlice.actions.filterPending;
export const filterCompleted = toDosSlice.actions.filterCompleted;
export default toDosSlice.reducer;
