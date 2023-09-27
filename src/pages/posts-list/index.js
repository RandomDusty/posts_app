import { useEffect, useState } from 'react';
import { useGetPostsQuery } from '../../entities/posts/api';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';
import './styles.css';
import Button from '@mui/material/Button';

const PostListPage = () => {
	const [page, setPage] = useState(0);
	const { data } = useGetPostsQuery(page);

	const PostItem = ({ index, style }) => {
		if (!data[index]) return null;
		return (
			<div style={style} className='postItem'>
				<div>
					<span className='postId'>№{data[index].id}</span>{' '}
					<span className='postName'>{data[index].name}</span>
					<p style={{ textOverflow: 'ellipsis' }}>{data[index].body}</p>
					<Link to={`post/${data[index].id}`}>
						<Button
							variant='contained'
							sx={{
								background: '#575757',
								'&:hover': { background: '#6e6e6e' },
							}}
						>
							Просмотр
						</Button>
					</Link>
				</div>
			</div>
		);
	};

	const itemsCount = 500;

	const isItemLoaded = ({ index }) => !!data[index];

	const loadMoreItems = visibleStopIndex => {
		// проверяем нужно ли подгружать новые посты
		const numbDifference = visibleStopIndex - (page + 1) * 20;
		if (numbDifference > 0 && numbDifference < 5) {
			console.log(visibleStopIndex);
			console.log(data);
			return setPage(page + 1);
		}
	};
	return (
		<div style={{ height: '100vh' }}>
			<InfiniteLoader
				isItemLoaded={isItemLoaded}
				loadMoreItems={loadMoreItems}
				itemCount={itemsCount}
			>
				{({ onItemsRendered, ref }) => (
					<FixedSizeList
						height={window.innerHeight}
						itemSize={160}
						itemCount={data?.length}
						ref={ref}
						onItemsRendered={onItemsRendered}
						style={{ overflowX: 'hidden' }}
					>
						{PostItem}
					</FixedSizeList>
				)}
			</InfiniteLoader>
		</div>
	);
};

export default PostListPage;
