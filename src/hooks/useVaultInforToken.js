import { useMemo } from 'react'
import { Bitcoin, Ethereum, USDC } from '@img/logo';

const useVaultInforToken = ({ vaultId }) => {
    const dataForMapping = useMemo(() => [
        {
            id: 1,
            title: 'ETH Void',
            currentDeposit: '100.000 ETH',
            capacity: '750.000 ETH',
            bg: 'bg-eth-banner',
            icon: Ethereum
        },
        {
            id: 2,
            title: 'BTC Void',
            currentDeposit: '100.000.000 BTC',
            capacity: '750.000.000 BTC',
            bg: 'bg-btc-banner',
            icon: Bitcoin
        },
        {
            id: 4,
            title: 'USDC Void',
            currentDeposit: '1.000.000.000 USDC',
            capacity: '7.000.000.000 USDC',
            bg: 'bg-usdc-banner',
            icon: USDC
        },
    ], [])

    const vaultItemInfo = useMemo(() => dataForMapping.find((i) => i.id === Number(vaultId)), [vaultId, dataForMapping])

    return { vaultItemInfo }
}

export default useVaultInforToken