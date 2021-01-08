import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Conectar'
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './firebaseconfig'


ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider config={firebaseConfig}>
    <Suspense fallback='Cargando...'>
    <App />
    </Suspense>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

