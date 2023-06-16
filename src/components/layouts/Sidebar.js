import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Input, Button } from "antd";
import SidebarLogo from "../../assets/images/logo.png";
import buyChip from "../../assets/images/deposit.png";
import Walletpng from "../../assets/images/wallet.png";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { login } from "../../store/actions/user";

const SidebarComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(s => s.user.isLogin);
    const [loginInfo, setLoginInfo] = useState({
        player: '',
        password: ''
    })
    const onLogin = () => {
        if (loginInfo.player === '' || loginInfo.password === '') {
            toast.warn('Please input player information'); return;
        }
        dispatch(login(loginInfo))
    }
    return (
        <>
            <div className="menu-space" />
            <div className="side-menu">
                <Row align="middle" className="logoContainer" onClick={() => navigate("/")}>
                    <img src={SidebarLogo} alt="" className="logo" style={{ width: '100%', objectFit: 'cover' }} />
                </Row>
                <div className="menu">
                    {
                        isLogin ?
                            <Row>
                                <Row className="w-full">
                                    <div className="menu-item w-full buy-chip" onClick={() => navigate("/wallet")} ><img src={Walletpng} style={{ width: 30 }} /><span>My Wallet</span></div>
                                </Row>
                                <Row className="w-full">
                                    <div className="menu-item w-full buy-chip" onClick={() => navigate("/chip")} ><img src={buyChip} style={{ width: 30 }} /> <span>Buy Chip</span></div>
                                </Row>
                            </Row> :
                            <Row>
                                <Row>
                                    <Input placeholder="Poker maven ID" onChange={e => setLoginInfo({...loginInfo, player: e.target.value})} />
                                </Row>
                                <Row>
                                    <Input placeholder="Password" type="password" onChange={e => setLoginInfo({...loginInfo, password: e.target.value})}/>
                                </Row>
                                <Row style={{ width: '100%' }}>
                                    <Button size="large" className="login-btn w-full" type="primary" onClick={() => onLogin()}>Login</Button>
                                </Row>
                            </Row>
                    }
                </div>
            </div>
        </>
    )
}

export default SidebarComponent;
