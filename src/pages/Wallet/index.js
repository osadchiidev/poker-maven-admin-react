import React, { useState } from "react";
import { Row, Col, Button, message, Divider, Card, Input, List, Avatar } from 'antd';
import { toast } from "react-toastify";
import { CopyFilled, CheckOutlined } from "@ant-design/icons";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import btcImg from '../../assets/images/currency/BTC.webp';
import etherImg from '../../assets/images/currency/ETH.webp';

const Wallet = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [copied, setCopied] = useState(false);
    const [buyChipCount, setBuyChipCount] = useState(0);
    const [walletBalance, setWalletBalance] = useState([{
        currency: '0',
        img: btcImg
    }, {
        currency: '0',
        img: etherImg
    }])
    const { address } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect();
    const info = () => {
        messageApi.info('Wallet address copied to clipboard!');
    };
    return (
        <div style={{ padding: 10, marginTop: 10 }}>
            {contextHolder}
            <Row gutter={[20, 20]} justify="start" >
                {address &&
                    <Col xs={24} sm={20} md={12} lg={6}>
                        <div className="wallet-card">{`${address.substring(0, 6)} xxxxx ${address.substring(address.length - 6, address.length)}`}
                            <CopyToClipboard text={address}
                                onCopy={() => setCopied(true)}>
                                <Button onClick={() => info()}>
                                    {copied ? <CheckOutlined /> : <CopyFilled />}
                                </Button>
                            </CopyToClipboard>
                        </div>
                    </Col>}
                <Col xs={24} sm={20} md={12} lg={6}><div className="add-wallet-card" onClick={() => connect()}>+</div></Col>
            </Row>
            <Divider />
            <Row gutter={[24, 24]} justify="start">
                <Col>
                    <Card title="Wallet Balance">
                        <List
                            itemLayout="horizontal"
                            dataSource={walletBalance}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.img} />}
                                        title={item.currency}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col>
                    <Card actions={[<Button>Buy</Button>]} title={`Buy Chip (Current chip balance: ${0})`}>
                        Chip: <Input value={buyChipCount} />
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default Wallet;
