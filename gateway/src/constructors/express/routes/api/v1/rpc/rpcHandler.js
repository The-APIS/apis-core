const axios = require('axios')
const router = require('express').Router()
const get = require('lodash/get')


const { getRPCServiceAddress } = require('@/share/lib')


const RPC_HANDLER_DEFAULTS = {
    ethereum: {
        defaults: {
            chain: 'ethereum',
            network: 'rinkeby',
        }
    },
    bitcoin: {
        defaults: {
            chain: 'bitcoin',
            network: 'testnet',
        }
    },
    binance_smart_chain: {
        defaults: {
            chain: 'binance_smart_chain',
            network: 'testnet',
        },
    }
}

const rpcHandler = module.exports = ({ }) => {

    router.post('/', async (req, res) => {
        const baseUrl = req.baseUrl
        const urlValue = baseUrl.split('/')[4]
        if (Object.keys(RPC_HANDLER_DEFAULTS).indexOf(urlValue) === -1) {

            throw new Error(`Chain value ${urlValue} is not supported`)
        }
        const defaults = get(RPC_HANDLER_DEFAULTS, [urlValue, 'defaults'])
        const { data, status } = await axios.post(`${getRPCServiceAddress({
            chain: defaults.chain,
            network: req.query.network || defaults.network,
        })}/api/v1/rpc`, req.body)
        return res.status(status).json(data)

    })
    return router
}








