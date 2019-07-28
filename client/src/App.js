import React from 'react';
import './App.css';
import Navigaton from "./component/layout/Navigation"
import Footer from "./component/layout/Footer"
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

//Store
import store from './store'
//Router
import RedirectRouter from './routes/RedirectRouter'
import { BrowserRouter as Router } from "react-router-dom";
//Su dung cau lenh toan cuc
//Vi neu load laij thi store bi reset nen ta phai luu lai vao store
if (localStorage.jwt_token) {
  const decode = jwt_decode(localStorage.jwt_token);
  console.log(decode)
  store.dispatch({ type: 'LOGIN_SUCCESS', user: decode })
}



function App() {
  return (
    <Provider store={store}>
      <Router>

        <div className="App">
          <Navigaton />


          {/*React Router chuyen huong trang khong can load lai trang dang nhap va dang ky va trang HOME  */}
          <RedirectRouter />


          <Footer />
        </div>
      </Router>
    </Provider>

  );
}

export default App;
