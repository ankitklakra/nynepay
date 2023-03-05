import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.css'
// ReactDOM.render(
//   <ChakraProvider>
//   <App />
//   </ChakraProvider>,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <ChakraProvider>
     <App />
     </ChakraProvider>
  </React.StrictMode>
);

