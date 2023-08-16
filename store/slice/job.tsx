import { Slice, createSlice } from "@reduxjs/toolkit";

export type JobType = {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
};

export interface JobState {
  data: JobType[];
  detail: JobType | null;
  query: {
    description: string;
    location: string;
    full_time: string;
  };
  page: number;
  isLoading: boolean;
  canNext: boolean;
  error: null;
}

const initialState: JobState = {
  data: [],
  detail: null,
  query: {
    description: "",
    location: "",
    full_time: "",
  },
  page: 1,
  isLoading: false,
  canNext: true,
  error: null,
};

const jobSlice: Slice = createSlice({
  name: "job",
  initialState: initialState,
  reducers: {
    setData: (state: JobState, action) => {
      state.data = [...state.data, ...action.payload];
    },
    clearData: (state: JobState) => {
      state.data = [];
    },
    setDetail: (state: JobState, action) => {
      state.detail = action.payload;
    },
    clearDetail: (state: JobState) => {
      state.detail = null;
    },
    setQuery: (state: JobState, action) => {
      state.query = action.payload;
    },
    incrementPage: (state: JobState) => {
      state.page += 1;
    },
    resetPage: (state: JobState) => {
      state.page = 1;
    },
    setCanNext: (state: JobState, action) => {
      state.canNext = action.payload;
    },
    setLoading: (state: JobState, action) => {
      state.isLoading = action.payload;
    },
    setError: (state: JobState, action) => {
      state.error = action.payload;
    },
    reset: (state: JobState) => {
      state.data = [];
      state.detail = null;
      state.query = {
        description: "",
        location: "",
        full_time: "",
      };
      state.isLoading = false;
      state.page = 1;
      state.canNext = true;
      state.error = null;
    },
  },
});

export const jobActions = jobSlice.actions;
export default jobSlice.reducer;
