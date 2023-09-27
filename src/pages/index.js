import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import '../shared/styles.css';
import SinglePost from './single-post';

const PostListPage = lazy(() => import('./posts-list'));

export const Routing = () => {
	return (
		<Routes>
			<Route path='' element={<PostListPage />} />
			<Route path='post/:id' element={<SinglePost />} />
		</Routes>
	);
};
