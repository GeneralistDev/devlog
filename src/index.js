import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { makeMainRoutes } from './Router';
import { createStore } from 'redux';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';


const networkInterface = createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj5s32i6svr4g01223wvpxfv8',
});

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {
                'Content-Type': 'application/json',
            };
        }
        
        if (localStorage.getItem('id_token')) {
            var idToken = localStorage.getItem("id_token");
            req.options.headers.authorization = "Bearer" + idToken;
        }

        next();
    }
}]);

const client = new ApolloClient({
    networkInterface: networkInterface,
});

let store = createStore(reducers);

ReactDOM.render((
    <ApolloProvider client={client} store={store}>
        {
            makeMainRoutes()
        }
    </ApolloProvider>
), document.getElementById('root'));

registerServiceWorker();
