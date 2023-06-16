import React from "react";
import {Row, Col} from 'antd'

const Wallet = () => {

    const addHander = () => {
        alert('you clicked add wallet button')
    }
    return (
        <div style={{padding: 10, marginTop: 10}}>
        <Row gutter={[20, 20]} justify="start" >
            {/* <Col xs={24} sm={20} md={12} lg={6}><div style={{height: 150, backgroundColor: 'white'}}>asdf</div></Col>
            <Col xs={24} sm={20} md={12} lg={6}><div style={{height: 150, backgroundColor: 'white'}}>asdf</div></Col>
            <Col xs={24} sm={20} md={12} lg={6}><div style={{height: 150, backgroundColor: 'white'}}>asdf</div></Col>
            <Col xs={24} sm={20} md={12} lg={6}><div style={{height: 150, backgroundColor: 'white'}}>asdf</div></Col>
            <Col xs={24} sm={20} md={12} lg={6}><div style={{height: 150, backgroundColor: 'white'}} className="wallet-card">asdf</div></Col> */}
            <Col xs={24} sm={20} md={12} lg={6}><div className="add-wallet-card" onClick={() => addHander()}>+</div></Col>
        </Row>
        </div>
    )
}

export default Wallet;
