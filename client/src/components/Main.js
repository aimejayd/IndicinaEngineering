import React, {Component} from 'react';
import axios from 'axios';
import validator from 'validator';
import '../assets/css/aliens.scss';
import {Link} from "react-router-dom";

class Main extends Component {
	state = {
		url: '',
		link: '',
		error: '',
	};

	handleChange = (e) => {
		this.setState({
			url: e.target.value
		})
	};

	setError = (message) => {
		this.setState({error: message, link: ''});
		setTimeout(() => {
			this.setState({error: ''});
		}, 3000);
	};

	handleSubmit = async (e) => {
		const {url} = this.state;
		e.preventDefault();
		const validURL = validator.isURL(url, {require_protocol: true});
		if (!validURL) {
			alert('Please ensure the url is correct and includes the http(s) protocol.');
		} else {
			try {
				const encodeUrl = (await axios.post('/api/encode', {url: url})).data;
				this.setState({link: encodeUrl.hashUrl});
			} catch (e) {
				const {error} = e.response.data;
				this.setError(error);
			}
		}
	};

	render() {
		const {link, error} = this.state;
		return (
			<div>
				<Link to="/list">
					<input type="button" value="View all links"/>
				</Link>
				<div className={'container'}>
					<div className="body-wrap">
						<header>
							<h1><span className="highlight">INDI</span><span className="highlight"></span>CINIA</h1>
							<small>ASSESSMENT DONE BY JAYD.</small>
						</header>
						<main>
							<form onSubmit={this.handleSubmit}>
								<fieldset>
									<input type="text" name="url"
									       placeholder={error !== '' ? error : 'Enter URL including the http(s) protocol'}
									       style={{border: error === '' ? '' : '5px solid red'}}
									       onChange={this.handleChange}/>
									<input type="submit" value="shorten"/>
								</fieldset>
								<br/>
								<fieldset className={error ? 'display-result' : 'hide-result'}>
									<span id="result">{error}</span>
								</fieldset>
								<fieldset className={link !== '' ? 'display-result' : 'hide-result'}>
									<span id="result">{link}</span>
								</fieldset>
							</form>
						</main>
					</div>
				</div>
			</div>
		);
	}
}

export default Main;