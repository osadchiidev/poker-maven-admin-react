import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Input, Button } from "antd";
import SidebarLogo from "../../assets/images/logo.png";
import buyChip from "../../assets/images/deposit.png";
import Walletpng from "../../assets/images/wallet.png";

import { useSelector } from 'react-redux';

const SidebarComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pIndex = React.useMemo(() => {
        const p = location.pathname;
        return p.includes("projects") ? 2 : p.includes("messages") ? 3 : p.includes("settings") ? 4 : 1;
    }, [location]);
    const isLogin = useSelector(s => s.user.isLogin);

    return (
        <>
            <div className="menu-space" />
            <div className="side-menu">
                <Row align="middle" className="logoContainer" onClick={() => navigate("/")}>
                    <img src={SidebarLogo} alt="" className="logo" style={{ width: '100%', objectFit: 'cover' }} />
                </Row>
                <div className="menu">
                    {
                        !isLogin ?
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
                                    <Input placeholder="Poker maven ID" />
                                </Row>
                                <Row>
                                    <Input placeholder="Password" type="password" />
                                </Row>
                                <Row style={{ width: '100%' }}>
                                    <Button size="large" className="login-btn w-full" type="primary">Login</Button>
                                </Row>
                            </Row>
                    }
                </div>
            </div>
        </>
    )
}

export default SidebarComponent;
