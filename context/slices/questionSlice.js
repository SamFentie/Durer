import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 100,
    totalItems: 0,
    totalPages: 1,
    hasMore: false
  }
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload.questions;
      state.pagination = action.payload.pagination;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.unshift(action.payload);
    },
    updateQuestion: (state, action) => {
      const index = state.questions.findIndex(q => q.id === action.payload.id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(q => q.id !== action.payload);
    },
    updateQuestionCategories: (state, action) => {
      const { questionId, categories } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.Categories = categories;
      }
    }
  }
});

export const {
  setQuestions,
  setLoading,
  setError,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  updateQuestionCategories
} = questionSlice.actions;

export const selectQuestions = (state) => state.questions.questions;
export const selectQuestionsLoading = (state) => state.questions.loading;
export const selectQuestionsError = (state) => state.questions.error;
export const selectQuestionsPagination = (state) => state.questions.pagination;

export default questionSlice.reducer;
