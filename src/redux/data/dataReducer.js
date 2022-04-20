const initialState = {
    loading: false,
    error: false,
    errorMsg: '',

    cost: 0,
    maxSupply: 0,
    maxFreeMintSupply: 0,
    maxFreeMintAmountPerAddr: 0,
    maxMintAmountPerTx: 0,

    isFreeMintOpen: false,
    paused: false,

    totalSupply: 0,
    currentWalletSupply: 0,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: false,
                errorMsg: '',
            }
        case 'CHECK_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: false,
                errorMsg: '',

                cost: action.payload.cost,
                maxSupply: action.payload.maxSupply,
                maxFreeMintSupply: action.payload.maxFreeMintSupply,
                maxFreeMintAmountPerAddr: action.payload.maxFreeMintAmountPerAddr,
                maxMintAmountPerTx: action.payload.maxMintAmountPerTx,

                isFreeMintOpen: action.payload.isFreeMintOpen,
                paused: action.payload.paused,

                totalSupply: action.payload.totalSupply,
                currentWalletSupply: action.payload.currentWalletSupply,
            }
        case 'CHECK_DATA_FAILED':
            return {
                ...initialState,
                loading: false,
                error: true,
                errorMsg: action.payload,
            }
        default:
            return state
    }
}

export default dataReducer
