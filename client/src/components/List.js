import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const List = () => {
	const [urls, setUrls] = useState([]);
	const [filter, setFilter] = useState([]);
	const [found, setFound] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				const apiData = (await axios('http://localhost:5000/api/list')).data;
				setUrls(apiData);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);
	const redirectUrl = async (url, hash) => {
		try {
			await axios.post(`http://localhost:5000/api/statistic`, {url, hash});
		} catch (e) {
			console.log(e);
		}
		window.location.replace(url);
	}
	const filterUrls = (query) => {
		let notFound = true;
		if (query !== '' && query.length >= 3) {
			const filteredData = urls.filter(function (item) {
				if (item.url.toLowerCase().includes(query.toLowerCase())) {
					return item.url.toLowerCase().includes(query.toLowerCase());
				} else if (item.hashUrl.toLowerCase().includes(query.toLowerCase())) {
					return item.hashUrl.toLowerCase().includes(query.toLowerCase());
				} else if (item.hash.toLowerCase().includes(query.toLowerCase())) {
					return item.hash.toLowerCase().includes(query.toLowerCase());
				}
			});
			notFound = filteredData.length;
			setFilter(filteredData);
		} else {
			setFilter([]);
		}
		setFound(notFound);
	};
	const setArray = (filter, urls) => {
		if (filter && filter.length) {
			return filter;
		} else if (urls && urls.length) {
			return urls;
		}
	}
	return (
		<div>
			<Link to="/">
				<input type="button" value="Back"/>
			</Link>
			<h1 style={{color: 'beige'}}>INDICINIA</h1>
			<p>Assessment done by Jayd.</p>
			<p>Here is the list of hashed urls..</p>
			{!!urls && urls.length ? <div style={{textAlign: 'center', margin: 5}}>
				<input type={'search'} placeholder={"Search url..."}
				       style={{width: 200}}
				       onChange={e => filterUrls(e.target.value)}/>
			</div> : null}
			{!found ? <p style={{color: 'red'}}>No url found!</p> : null}
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
					{!!setArray(filter, urls) ? setArray(filter, urls).slice(0).reverse().map(((url, index) => (
						<tr>
							<th scope="row">{index + 1}</th>
							<td><small>{url.url}</small></td>
							<td><small className={'url'} onClick={() => redirectUrl(url.url, url.hash)}>{url.hashUrl}</small></td>
							<td><small className={'url'} onClick={() => redirectUrl(url.url, url.hash)}>{url.hash}</small></td>
							<td><small>{url.createdAt}</small></td>
						</tr>
					))) : <p>No urls added yet!</p>}
					</tbody>
				</table>
			</center>
			< style
				jsx={"true"}> {
				`
          h1, p {
            text-align: center;
          }

          small.url {
            color: white;
            cursor: pointer;
          }

          small.url:hover {
            color: green;
            cursor: pointer;
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