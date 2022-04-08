import React from 'react'
import { Flex, useMatchBreakpoints, Text } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { Bills } from 'state/types'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import getTimePeriods from 'utils/getTimePeriods'
import { Container } from './styles'
import BillModal from './Modals'

const BillsListView: React.FC<{ bills: Bills[] }> = ({ bills }) => {
  const { account } = useActiveWeb3React()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const billsListView = bills.map((bill) => {
    const { token, quoteToken, earnToken } = bill
    const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
    return {
      tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
      id: bill.index,
      title: (
        <ListViewContent
          title={bill.billType}
          value={bill.lpToken.symbol}
          width={isMobile ? 120 : 150}
          height={45}
          ml={10}
        />
      ),
      cardContent: (
        <>
          <ListViewContent
            title="Price"
            value={`$${bill?.priceUsd}`}
            width={isMobile ? 90 : 150}
            ml={20}
            height={52.5}
            toolTip="Stuff"
          />
          <ListViewContent
            title="Discount"
            value={`${bill?.discount}%`}
            width={isMobile ? 100 : 140}
            height={52.5}
            toolTip="Stuff"
          />
          <ListViewContent
            title="Vesting Time"
            value={`${vestingTime.days}d, ${vestingTime.minutes}h, ${vestingTime.seconds}m`}
            width={isMobile ? 120 : 180}
            height={52.5}
            toolTip="Stuff"
          />
          {!isMobile && (
            <Flex alignItems="center" style={{ height: '100%' }}>
              {account ? <BillModal bill={bill} buttonText="BUY" id={bill.index} buyFlag /> : <UnlockButton />}
            </Flex>
          )}
        </>
      ),
      expandedContent: isMobile && (
        <Flex alignItems="center" justifyContent="center" style={{ height: '100%', width: '100%' }}>
          {account ? <BillModal bill={bill} buttonText="BUY" id={bill.index} buyFlag /> : <UnlockButton />}
        </Flex>
      ),
    } as ExtendedListViewProps
  })

  return (
    <Container>
      <Text margin="20px 10px">Available Treasury Bills</Text>
      <ListView listViews={billsListView} />
    </Container>
  )
}

export default React.memo(BillsListView)