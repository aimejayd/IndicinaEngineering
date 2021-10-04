import React, {} from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from "./components/Main";
import List from "./components/List";

const Routes = () => {
	return (
		<Switch>
			<Route exact={true} path={'/'} component={Main}/>
			<Route exact={true} path={'/list'} component={List}/>
		</Switch>
	);
};

export default Routes;