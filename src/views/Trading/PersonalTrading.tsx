import React, { useMemo } from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, Text, ButtonSquare } from '@apeswapfinance/uikit'
import { useGetPersonalTradingStats } from 'hooks/api'

import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import CardValue from 'views/Home/components/CardValue'
import useI18n from 'hooks/useI18n'
import { usePriceBananaBusd, useProfile } from 'state/hooks'
import UnlockButton from 'components/UnlockButton'
import PageLoader from 'components/PageLoader'
import { useParams } from 'react-router-dom'
import { Button } from '@pancakeswap-libs/uikit'

const StyledCardHeader = styled(CardHeader)`
  background: #ffb300;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`
const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const StyledTextHeader = styled.div`
  font-family: Poppins;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-transform: uppercase;
  color: #ffffff;
`

const StyledTextSubHead = styled.div`
  font-family: Poppins;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  text-transform: uppercase;
  color: #ffffff;
`

const StyledTextPosition = styled.div`
  font-family: Poppins;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  text-transform: capitalize;
  color: #ffffff;
`

const StyledAvatar = styled.img`
  height: 70px;
  width: 70px;
  position: absolute;
  margin-top: -100px;
  margin-left: 30px;

  border-radius: 50px;
  border: solid 2px #ffb300;
  background-color: white;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: -50px;
    margin-left: 20px;
    height: 100px;
    width: 100px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    height: 70px;
    width: 70px;
    position: absolute;
    margin-top: -82px;
    margin-left: 30px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-top: -50px;
    margin-left: 20px;
    height: 100px;
    width: 100px;
  }
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const StyledBananaReward = styled.img`
  width: 23px;
  height: 23px;
  border-radius: 50px;
  padding: 3px;
  background-color: rgb(255, 179, 0, 0.1);
  margin-right: 9px;
`

const Trading = (individual) => {
  const { address, volume, prize, position } = individual
  const bananaUsdPrice = usePriceBananaBusd()
  const TranslateString = useI18n()
  const { profile } = useProfile()

  const profileImage = profile ? profile?.rarestNft.image : null

  return (
    <div>
      {!address ? (
        <Card>
          <StyledCardHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <StyledTextHeader>Your Stats</StyledTextHeader>
            </Flex>
          </StyledCardHeader>
          <CardBody>
            <UnlockButton fullWidth />
          </CardBody>
        </Card>
      ) : (
        <Card>
          <StyledCardHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex flexDirection="column" ml="100px">
                <StyledTextHeader>Your Stats</StyledTextHeader>
                {address !== null && (
                  <StyledTextSubHead>
                    {address.substr(1, 10)}....{address.substr(address.length - 5)}
                  </StyledTextSubHead>
                )}
              </Flex>
              <StyledTextPosition>{position}th</StyledTextPosition>
            </Flex>
          </StyledCardHeader>
          <StyledAvatar src={profileImage} alt="profile avatar" />
          {/* eslint-disable-next-line no-nested-ternary */}
          {individual ? (
            <CardBody>
              <Flex flexDirection="column" alignItems="center">
                <Flex justifyContent="center" mb="17px">
                  <Flex flexDirection="column" mr="25px">
                    <StyledText fontFamily="poppins" fontSize="12px" color="primary">
                      Volume
                    </StyledText>
                    <CardValue
                      fontSize="20px"
                      fontWeight={700}
                      decimals={2}
                      value={volume}
                      fontFamily="poppins"
                      prefix="~"
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="25px">
                    <StyledText fontFamily="poppins" fontSize="12px" color="primary">
                      Prize
                    </StyledText>
                    <Flex justifyContent="center" alignItems="center">
                      <StyledBananaReward src="/images/tokens/banana.svg" alt="banana-token-reward" />
                      <CardValue
                        fontSize="20px"
                        fontWeight={700}
                        decimals={2}
                        value={bananaUsdPrice.times(prize).toNumber()}
                        fontFamily="poppins"
                        prefix="$"
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <ButtonSquare>TRADE HERE</ButtonSquare>
              </Flex>
              <img
                width="250px"
                style={{ opacity: 0.1, stroke: '#FFB300', position: 'absolute', right: '-5px', bottom: '0px' }}
                src="/images/monkey-yellow-half.svg"
                alt="monkey"
              />
            </CardBody>
          ) : (
            <Heading fontSize="16px" mb="24px" m="16px" style={{ textAlign: 'center' }}>
              No Volume for this pair
            </Heading>
          )}
        </Card>
      )}
    </div>
  )
}
export default Trading
