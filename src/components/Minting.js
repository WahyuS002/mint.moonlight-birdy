import React, { useEffect, useState } from 'react'

import Web3 from 'web3'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'

import { contains, getProofForAddress } from '../lib/Whitelist'

import mintingImage from '../assets/images/minting.png'
import { toast } from 'react-toastify'

import Modal from './Modal'
import useModal from '../hooks/useModal'
import { AnimatePresence } from 'framer-motion'

const truncate = (input, len) => (input.length > len ? `${input.substring(0, len)}...` : input)
let web3 = new Web3()

export default function Minting() {
    const dispatch = useDispatch()
    const blockchain = useSelector((state) => state.blockchain)
    const data = useSelector((state) => state.data)
    const { mintedModalOpen, closeMintedModal, openMintedModal } = useModal()

    const [claimingNft, setClaimingNft] = useState(false)

    const [mintAmount, setMintAmount] = useState(1)
    const [canIncrement, setCanIncrement] = useState(true)
    const [canDecrement, setCanDecrement] = useState(false)

    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: '',
        SCAN_LINK: '',
        NETWORK: {
            NAME: '',
            SYMBOL: '',
            ID: 0,
        },
        NFT_NAME: '',
        SYMBOL: '',
        MAX_SUPPLY: 0,
        GAS_LIMIT: 0,
    })

    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1
        if (newMintAmount === 1) {
            setCanDecrement(false)
        }
        if (newMintAmount < 1) {
            newMintAmount = 1
        }
        setMintAmount(newMintAmount)
        setCanIncrement(true)
    }

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1
        if (newMintAmount === parseInt(data.maxMintAmountPerTx)) {
            setCanIncrement(false)
        }
        if (newMintAmount > parseInt(data.maxMintAmountPerTx)) {
            newMintAmount = parseInt(data.maxMintAmountPerTx)
        }
        setMintAmount(newMintAmount)
        setCanDecrement(true)
    }

    const getConfig = async () => {
        const configResponse = await fetch('/config/config.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        const config = await configResponse.json()
        SET_CONFIG(config)
    }

    const getData = () => {
        if (blockchain.account !== '' && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account))
        }
    }

    const claimNFTs = () => {
        let cost = data.cost
        let gasLimit = CONFIG.GAS_LIMIT
        let totalCostWei = String(cost * mintAmount)

        if (data.paused) {
            toast.info('Minting will open soon.')
        } else {
            console.log('Current Wallet Supply : ', data.currentWalletSupply)
            if (parseInt(mintAmount) + parseInt(data.totalSupply) > parseInt(data.maxSupply)) {
                toast.warning('You have exceeded the max limit of minting.')
            } else {
                if (data.whitelistMintEnabled) {
                    if (!contains(blockchain.account)) {
                        toast.warning('This address is not WL!')
                    } else {
                        return whitelistMintTokens(gasLimit)
                    }
                } else if (data.isFreeMintOpen) {
                    return freeMintTokens(gasLimit)
                } else {
                    return mintTokens(gasLimit, totalCostWei)
                }
            }
        }
    }

    const whitelistMintTokens = (gasLimit) => {
        // Check address is already claimed
        if (data.getClaimedWhitelistValue) {
            toast.warning("You're already claimed NFT on whitelist mint phase!")
        } else {
            if (mintAmount !== 1) {
                toast.warning('You can only minting 1 NFT on whitelist mint phase!')
            } else {
                toast.info(`WL Minting for free ${CONFIG.NFT_NAME}`)
                setClaimingNft(true)
                return blockchain.smartContract.methods
                    .whitelistMint(mintAmount, getProofForAddress(blockchain.account))
                    .send({
                        gasLimit: gasLimit,
                        to: CONFIG.CONTRACT_ADDRESS,
                        from: blockchain.account,
                    })
                    .once('error', () => {
                        toast.error('Sorry, something went wrong please try again later.')
                        setClaimingNft(false)
                    })
                    .then(() => {
                        toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                        setClaimingNft(false)
                        dispatch(fetchData(blockchain.account))
                        openMintedModal()
                    })
            }
        }
    }

    const freeMintTokens = (gasLimit) => {
        if (parseInt(data.currentWalletSupply) + mintAmount > parseInt(data.maxFreeMintAmountPerAddr)) {
            toast.warning('Exceeds max free mint per wallet!')
        } else if (parseInt(data.totalSupply) + mintAmount > parseInt(data.maxFreeMintSupply)) {
            toast.warning('Exceeds max free mint supply!')
        } else {
            toast.info(`Minting your free ${CONFIG.NFT_NAME}...`)
            setClaimingNft(true)
            return blockchain.smartContract.methods
                .freeMint(mintAmount)
                .send({
                    gasLimit: gasLimit,
                    to: CONFIG.CONTRACT_ADDRESS,
                    from: blockchain.account,
                })
                .once('error', () => {
                    toast.error('Sorry, something went wrong please try again later.')
                    setClaimingNft(false)
                })
                .then(() => {
                    toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                    setClaimingNft(false)
                    dispatch(fetchData(blockchain.account))
                    openMintedModal()
                })
        }
    }

    const mintTokens = (gasLimit, totalCostWei) => {
        if (mintAmount > parseInt(data.maxMintAmountPerTx)) {
            toast.warning('Exceeds max mint amount per tx!')
        } else if (parseInt(data.totalSupply) + mintAmount > parseInt(data.maxSupply)) {
            toast.warning('Max supply exceeded!')
        } else if (parseInt(data.currentWalletSupply) + mintAmount > 20) {
            toast.warning('Exceeds max mint per wallet!')
        } else {
            toast.info(`Minting your ${CONFIG.NFT_NAME}...`)
            setClaimingNft(true)
            return blockchain.smartContract.methods
                .mint(mintAmount)
                .send({
                    gasLimit: gasLimit,
                    to: CONFIG.CONTRACT_ADDRESS,
                    from: blockchain.account,
                    value: totalCostWei,
                })
                .once('error', (err) => {
                    console.log(err)
                    toast.error('Sorry, something went wrong please try again later.')
                    setClaimingNft(false)
                })
                .then((receipt) => {
                    console.log(receipt)
                    toast.success(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`)
                    setClaimingNft(false)
                    dispatch(fetchData(blockchain.account))
                    openMintedModal()
                })
        }
    }

    useEffect(() => {
        getConfig()
    }, [])

    useEffect(() => {
        getData()
    }, [blockchain.account])

    return (
        <div className="flex justify-center">
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {mintedModalOpen && <Modal handleClose={closeMintedModal} />}
            </AnimatePresence>
            <div className="p-12 relative bg-gray-900 border-gray-600 border-2 max-w-xl rounded-xl">
                <div className="flex justify-center">
                    <img className="absolute -top-12 w-24 h-24 rounded-full border-gray-600 border-[3px]" src={mintingImage} alt="MintingImage" draggable="false" />
                </div>
                <div>
                    <h1 className="mt-6 font-semibold text-2xl text-center">Get Your Moonlight Birdy</h1>
                    <div className="flex justify-center my-2">
                        <span className="px-3 bg-white text-gray-900 rounded-full text-sm font-bold py-[0.2rem]">
                            {blockchain.account && !data.loading ? data.totalSupply : 'X'}/{CONFIG.MAX_SUPPLY}
                        </span>
                    </div>

                    {blockchain.account !== null && !data.loading ? (
                        <div>
                            {data.paused ? (
                                <p className="max-w-xs text-sm my-6 text-center">Smart contract is paused</p>
                            ) : (
                                <>
                                    {data.whitelistMintEnabled ? <p className="max-w-xs text-sm my-6 text-center">Whitelist Mint. 1 Free mint per wallet</p> : null}
                                    {data.isFreeMintOpen ? (
                                        <p className="max-w-xs text-sm my-6 text-center">Public Free Mint. Claim your free {data.maxFreeMintAmountPerAddr} Moonlight Birdy.</p>
                                    ) : null}
                                    {!data.isFreeMintOpen && !data.whitelistMintEnabled ? (
                                        <p className="max-w-xs text-sm my-6 text-center">
                                            {web3.utils.fromWei(String(data.cost), 'ether')} ETH per Moonlight Birdy. {data.maxMintAmountPerTx} max per transaction. 20 Max per wallet.
                                        </p>
                                    ) : null}
                                </>
                            )}

                            {claimingNft ? (
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 ease-in-out px-5 py-2 rounded-full text-gray-900 font-bold cursor-not-allowed"
                                        disabled
                                    >
                                        Minting your nft . . .
                                    </button>
                                </div>
                            ) : (
                                <div className="flex justify-center items-center space-x-4 mt-6">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            decrementMintAmount()
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={
                                                (canDecrement ? 'text-orange-400 hover:text-orange-500' : 'text-gray-500 cursor-not-allowed') + ' h-8 w-8 transition-all duration-300 ease-in-out'
                                            }
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 ease-in-out px-5 py-2 rounded-full text-gray-900 font-bold"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            claimNFTs()
                                            getData()
                                        }}
                                    >
                                        Mint {mintAmount} NFT
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            incrementMintAmount()
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={
                                                (canIncrement ? 'text-orange-400 hover:text-orange-500' : 'text-gray-500 cursor-not-allowed') + ' h-8 w-8 transition-all duration-300 ease-in-out'
                                            }
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : null}

                    {blockchain.account === '' || blockchain.smartContract === null ? (
                        <div>
                            <p className="text-sm text-center my-6">Connect to the {CONFIG.NETWORK.NAME} network</p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 ease-in-out px-5 py-2 rounded-full text-gray-900 font-bold"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(connect())
                                        getData()
                                    }}
                                >
                                    Connect Your Wallet
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {data.loading ? (
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-orange-400 hover:bg-orange-500 transition-all duration-300 ease-in-out px-5 py-2 rounded-full text-gray-900 font-bold cursor-not-allowed"
                                        disabled
                                    >
                                        Loading . . .
                                    </button>
                                </div>
                            ) : null}
                        </>
                    )}

                    <div className="mt-4 flex justify-center">
                        <a href={CONFIG.SCAN_LINK} target={'_blank'} className="text-xs text-center text-gray-400 hover:text-white transition-all duration-300 ease-in-out" rel="noreferrer">
                            {truncate(CONFIG.CONTRACT_ADDRESS, 20)}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
