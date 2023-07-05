import React, { useEffect } from 'react';
import { Modal, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { withdrawChip } from '../../store/actions/user';

const WithdrawModal = ({open, chip, onCancel}) => {

    const dispatch = useDispatch();
    const onWithdraw = () => {
        dispatch(withdrawChip(chip));
        onCancel();
    }
    return (
        <Modal open={open} onCancel={onCancel} onOk={onWithdraw} className='darkModal' title="Withdraw" okText="Withdraw">
            <Row>Withdraw chip balance: {chip}</Row>
            <Row>You'll get {Number((Number(parseInt(chip)) * 0.8).toFixed(2))} USD</Row>
        </Modal>
    )
}

export default WithdrawModal;