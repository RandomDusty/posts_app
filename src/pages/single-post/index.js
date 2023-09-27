import { useParams, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useGetSinglePostByIdQuery } from '../../entities/posts/api';

const SinglePost = () => {
	const { id } = useParams();
	const { data } = useGetSinglePostByIdQuery(id);

	return (
		<div style={{ marginLeft: '5px' }}>
			{data ? (
				<div>
					<p>Id: {data.id}</p>
					<p>Name: {data.name}</p>
					<p>Text: {data.body}</p>

					<Link to={`/`}>
						<Button
							variant='contained'
							sx={{
								background: '#575757',
								'&:hover': { background: '#6e6e6e' },
							}}
						>
							Назад
						</Button>
					</Link>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
export default SinglePost;
