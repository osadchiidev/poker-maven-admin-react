import React, { useEffect, useState } from "react";
import { Row, Col, message, Input, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEthers } from "@usedapp/core";
import defaultAvatar from '../../assets/images/avatar0.jpg';
import ChipImg from '../../assets/images/chip.png';
import metamask from '../../assets/images/meta.png';
import { usePokerContract } from '../../hooks/useContract'
import { buyChip, withdrawChip, getBalance, getPlayers, transferChip } from '../../store/actions/user';
import { toast } from "react-toastify";

const owner = process.env.REACT_APP_ETHEREUM_NODE;

const Wallet = () => {
    const user = useSelector((s) => s.user.user.data);
    // const players = useSelector((s) => s.user.players);

    const [tab, setTab] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
    const [buyChipCount, setBuyChipCount] = useState(0);
    const [withdrawChipCount, setWithdrawChipCount] = useState(0);
    const [transferChipAmount, setTransferChipAmount] = useState(0);
    const [player, setPlayer] = useState('');

    const dispatch = useDispatch();
    const { activateBrowserWallet, account } = useEthers();
    const PokerContract = usePokerContract();
    
    
    const buyChipHandle = async () => {
        try {
            if (buyChipCount <= 0) {
                messageApi.warning('You cannot buy 0 chip'); return;
            }
            const response = await PokerContract.depositUSDT(buyChipCount.toString());

            if (response) {
                await PokerContract.setWhitelistStatus(account, true);
                dispatch(buyChip(buyChipCount / (10 ** 18)));
            }
        } catch (e) {
            console.log(e)
        }
    }

    const withdrawChipHandle = async () => {
        try {
            if (withdrawChip <= 0) {
                messageApi.warning('You cannot withdraw 0 chip'); return;
            }
            const response = await PokerContract.updateWithdrawalAmount(account, (withdrawChipCount * 0.98).toString());
            const res = await PokerContract.withdrawToken();
            if (res && response) {
                dispatch(withdrawChip(withdrawChipCount / (10 ** 18)));
            }
        } catch (e) {
            console.log(e);
            if (e?.data?.code === 3)
                toast.error('You cannot withdraw with this amount!');
        }
    }

    const withdrawByOwner = async () => {
        try {
            if (withdrawChip <= 0) {
                messageApi.warning('You cannot withdraw 0 chip'); return;
            }
            const response = await PokerContract.withdrawOwner(withdrawChipCount.toString());
            if (response) {
                toast.success('Successfully withdraw!');
            }
        } catch (e) {
            console.log(e);
            if (e?.data?.code === 3)
                toast.error('You cannot withdraw with this amount!');
        }
    }

    const transferChipHandler = () => {
        if (player === '' || transferChipAmount <= 0) {
            toast.warn('Input information correctly.'); return;
        }

        dispatch(transferChip({player: player, amount: transferChipAmount}));
    }

    useEffect(() => {
        dispatch(getBalance());
        dispatch(getPlayers());
    }, [dispatch]);

    return (
        <div style={{ paddingTop: 10, marginTop: 10 }}>
            {contextHolder}
            <Row gutter={[24, 24]}>
                <Col md={8}>
                    <div className="profile-container">
                        <div className="profile-up">
                            <Row gutter={[24, 24]} style={{ height: '100%' }}>
                                <Col md={12} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Avatar src={defaultAvatar} style={{ width: 80, height: 80 }} className='setting-avatar' />
                                </Col>
                                <Col md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ marginBottom: 10, fontSize: 20, fontWeight: 700 }}>{user.RealName}</div>
                                    <div>@{user.Player}</div>
                                </Col>
                            </Row>
                        </div>
                        <div className="profile-down">
                            <Row gutter={[24, 24]}>
                                <Col md={12}>
                                    <img src={ChipImg} style={{ width: '100%' }} alt="" />
                                </Col>
                                <Col md={12} style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center', fontSize: 40, fontWeight: 700 }}>{user.Balance}</Col>
                            </Row>
                        </div>
                    </div>
                    {/* wallet connect */}

                    <div className="metamask-btn" onClick={activateBrowserWallet}>
                        <img src={metamask} style={{ height: '60%' }} alt="" /><div style={{ fontSize: 20, fontWeight: 400, marginLeft: 10 }}>{account ? 'Metamask connected' : 'Connect with Metamask'}</div>
                    </div>
                    <div className="otherwallet-btn" style={{ fontSize: 20, fontWeight: 400 }}>Connect with Desktop App</div>
                </Col>
                <Col>
                    <div className="control-panel">
                        <div className="control-tabs">
                            <div className={`control-tab ${tab === 0 && 'active'}`} onClick={() => setTab(0)}>Buy</div>
                            <div className={`control-tab ${tab === 1 && 'active'}`} onClick={() => setTab(1)}>Withdraw</div>
                            {owner !== account && <div className={`control-tab ${tab === 2 && 'active'}`} onClick={() => setTab(2)}>Owner withdraw</div>}
                            <div className={`control-tab ${tab === 3 && 'active'}`} onClick={() => setTab(3)}>Transfer</div>
                        </div>

                        {tab === 0 &&
                            <div className="tab-body">
                                {account ?
                                    <div>
                                        <div>{account}</div>
                                        <div className="chip-budget">1 USDT = 1 CHIP</div>

                                        <div>
                                            <Input type="number" addonAfter="CHIP" style={{ height: 30 }} value={buyChipCount / (10 ** 18)} onChange={e => setBuyChipCount(parseInt(e.target.value) * (10 ** 18))} />
                                        </div>
                                        <div className="buy-chip-btn" onClick={buyChipHandle}>BUY</div>
                                    </div> :
                                    <div>Please connect wallet!</div>
                                }
                            </div>
                        }
                        {tab === 1 && <div className="tab-body">
                            {
                                account ?
                                    <div>
                                        <div>{account}</div>
                                        <div className="chip-budget">1 CHIP = 0.98 USDT</div>
                                        <div>
                                            <Input
                                                type="number"
                                                addonBefore="CHIP"
                                                value={withdrawChipCount / (10 ** 18)}
                                                onChange={e => setWithdrawChipCount(parseInt(e.target.value) * (10 ** 18))}
                                                addonAfter={`${withdrawChipCount / (10 ** 18) * 0.98} USDT`}
                                            />
                                        </div>
                                        <div className="buy-chip-btn" onClick={withdrawChipHandle}>WITHDRAW</div>
                                    </div> :
                                    <div>Please connect wallet!</div>
                            }
                        </div>}
                        {tab === 2 && <div className="tab-body">
                            <div>Current balance of Contract</div>
                            <div style={{ marginTop: 20 }}> Please input amount that you want to withdraw</div>
                            <div style={{ marginTop: 20 }}>
                                <Input
                                    type="number"
                                    addonAfter="USDT"
                                    onChange={e => setWithdrawChipCount(parseInt(e.target.value) * (10 ** 18))}
                                />
                            </div>
                            <div className="buy-chip-btn" onClick={withdrawByOwner}>WITHDRAW TO OWNER WALLET</div>
                        </div>}
                        {tab === 3 && <div className="tab-body">
                            <div>Input player id to transfer chip</div>
                            <div style={{ marginTop: 20 }}>
                                <Input
                                    value={player}
                                    onChange={e => setPlayer(e.target.value)}
                                />
                            </div>
                            <div style={{marginTop: 20}}>Input chip amount</div> 
                            <div style={{marginTop: 20}}>
                                <Input
                                    value={transferChipAmount}
                                    type="number"
                                    onChange={e => setTransferChipAmount(e.target.value)}
                                />
                            </div>
                            <div className="buy-chip-btn" onClick={transferChipHandler}>TRANSFER CHIP</div>
                        </div>}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Wallet;
