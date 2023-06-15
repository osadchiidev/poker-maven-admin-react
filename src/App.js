import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import "./index.scss";
import "./assets/scss/index.scss";
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PortalLayout from './components/layouts/PortalLayout';
import cx from 'classnames';
import { useSelector } from "react-redux";

// pages
import Portal from "./pages/Portal";
import Chip from "./pages/Chip";
import Wallet from "./pages/Wallet";
import Play from "./pages/Play";

function App() {
  const auth = useSelector(s => s.user);
  const [height, setHeight] = React.useState(window.innerHeight);
  React.useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize)
  })

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: 'red'
      }
    }}>
      <div className={cx('app', { dark: true })} style={{ minHeight: height }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortalLayout />}>
              <Route index element={<Portal />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/chip" element={<Chip />} />
            </Route>
            <Route path="/play" element={<Play />} />
            {/* <Route path="/login" element={!auth.isLogin ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!auth.isLogin ? <SignUp /> : <Navigate to="/dashboard" />} /> */}
          {/* {auth.isLogin ?
            <React.Fragment>
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/chip" element={<Chip />} />
            </React.Fragment>
            :
            <Route path="*" element={<Navigate to="/" />} />
          } */}
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </ConfigProvider>
  );
}

export default App;
