import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const List = () => {
	const [urls, setUrls] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const apiData = (await axios('/api/list')).data;
				setUrls(apiData);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);
	return (
		<div>
			<Link to="/">
				<input type="button" value="Back"/>
			</Link>
			<h1 style={{color: 'beige'}}>INDICINIA</h1>
			<p>Assessment done by Jayd.</p>
			<p>Here is the list of hashed urls..</p>
			<center>
				<table className="table">
					<thead>
					<tr>
						<th>#</th>
						<th>Url</th>
						<th>Hashed Url</th>
						<th>Hash</th>
						<th>Created At</th>
					</tr>
					</thead>
					<tbody>
					{!!urls && urls.length ? urls.map(((url, index) => (
						<tr>
							<th scope="row">{index + 1}</th>
							<td>{url.url}</td>
							<td><a href={url.url}>{url.hashUrl}</a></td>
							<td><a href={url.url}>{url.hash}</a></td>
							<td>{url.createdAt}</td>
						</tr>
					))) : <p>No urls added yet!</p>}
					</tbody>
				</table>
			</center>
			< style
				jsx> {
				`
          h1, p {
            text-align: center;
          }

          a {
            color: white;
          }

          a:hover {
            color: green;
          }

          .table {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 50%;
          }

          .table td, .table th {
            border: 1px solid #ddd;
            padding: 8px;
          }

          .table th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            color: white;
          }
				`
			}</style>
		</div>
	);
};

export default List;