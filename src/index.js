import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { legacy_createStore as createStore } from 'redux';
// import reducer from './reducers/ticket-list-reducer';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

store.subscribe(() =>
  console.log(store.getState())
);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
