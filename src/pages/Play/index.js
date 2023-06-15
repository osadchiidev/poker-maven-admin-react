import React from "react";
import { FloatButton } from 'antd';
import { WalletOutlined, SettingOutlined, LogoutOutlined, BankFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Play = () => {
    const navigate = useNavigate();
    return (
        <div className="play-panel">
            <iframe src="https://tiltedstacks.com" />
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{
                    top: 4,
                    right: 4
                }}
                icon={<SettingOutlined />}
            >
                <FloatButton icon={<LogoutOutlined />} onClick={() => navigate('/')} />
                <FloatButton icon={<WalletOutlined />} onClick={() => navigate('/wallet')}/>
                <FloatButton icon={<BankFilled />} onClick={() => navigate('/chip')}/>
            </FloatButton.Group>
        </div>
    )
}

export default Play;