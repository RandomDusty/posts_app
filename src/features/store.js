import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from '../entities/posts/api';

export const store = configureStore({
	reducer: {
		[postsApi.reducerPath]: postsApi.reducer,
	},
	middleware: getMiddleware => getMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch);
