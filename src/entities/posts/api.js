import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
	reducerPath: 'postApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/comments',
	}),
	endpoints: builder => ({
		getPosts: builder.query({
			query: page => `?_start=${page * 20}&_limit=20`,
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName;
			},
			merge: (currentCache, newItems) => {
				currentCache.push(...newItems);
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
		}),
		getSinglePostById: builder.query({
			query: id => `/${id}`,
		}),
	}),
});

export const { useGetPostsQuery, useGetSinglePostByIdQuery } = postsApi;
