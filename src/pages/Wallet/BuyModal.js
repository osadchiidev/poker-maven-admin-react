import { Modal, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyChip } from '../../store/actions/user';
import { usePokerContract } from '../../hooks/useContract'
const BuyModal = ({ onCancel, chip, open }) => {

    const dispatch = useDispatch();
    const PokerContract = usePokerContract();
    const onBuy = async () => {
        const tx = await PokerContract.deposit(Number(parseInt(chip)));
        await tx.wait();
        dispatch(buyChip(chip));
        onCancel();
    }
    return (
        <Modal title="Buy chip" okText="Buy" onOk={onBuy} onCancel={onCancel} open={open} className='darkModal'>
            <Row>
                Chip amount: {chip}
            </Row>
            <Row>
                Needed crypto amount: {(Number(parseInt(chip)) * 1)} USD
            </Row>
        </Modal>
    )
}

export default BuyModal;