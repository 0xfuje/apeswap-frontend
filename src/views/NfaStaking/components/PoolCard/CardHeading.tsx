/** @jsxImportSource theme-ui */
import React from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { BLOCKS_PER_DAY } from 'config'
import styled from '@emotion/styled'
import { useWeb3React } from '@web3-react/core'
import { NfaStakingPool } from 'state/types'
import { Flex, Heading, Text } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import ExpandableSectionButton from './ExpandableSectionButton'
import HarvestActions from './CardActions/HarvestActions'
import ApprovalAction from './CardActions/ApprovalAction'
import StakeAction from './CardActions/StakeActions'
import Image from '../../../Nft/components/Image'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  pool?: NfaStakingPool
  stakeToken?: string
  earnToken?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  poolAPR?: string
  removed?: boolean
  sousId?: number
  lpSymbol?: string
  earnTokenImage?: string
  showExpandableSection?: boolean
  stakingTokenAddress?: string
  rewardTokenPrice?: number
  tier?: number
}

const PoolFinishedSash = styled.div`
  @media (max-width: 1000px) {
    background-image: url('/images/gnanaSash.svg');
    background-position: top right;
    background-repeat: no-repeat;
    height: 35px;
    position: absolute;
    right: -3px;
    top: -1.5px;
    width: 45px;
  }
`

const StyledBackground = styled(Flex)`
  margin-left: 10px;

  @media (min-width: 500px) {
    justify-content: space-between;
    background: rgb(255, 179, 0, 0.4);
    border-radius: 20px;
    width: 200px;
    align-items: flex-end;
    height: 80px;
    margin-left: 0px;
    padding-left: 7px;
    padding-right: 7px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 121px;
  }
`

const StyledHeading = styled(Heading)`
  font-size: 12px;
  font-weight: 800;
  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 22px;
  }
`

const StyledText1 = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 15px;
  }
`

const StyledText2 = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  margin-top: 1px;
`

const StyledText3 = styled(Text)`
  font-size: 12px;
  color: #38a611;
  font-weight: 800;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
    line-height: 29px;
  }
`

const StyledText4 = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  margin-top: 1px;
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const StyledFlexContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 6px;
  margin-right: 8px;
  align-items: center;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-right: 15px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
`

const StyledFlexEarned = styled(Flex)`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-right: 0px;
    flex-direction: column;
  }
`

const StyledFlexEarnedSmall = styled(Flex)`
  margin-right: 10px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  width: 120px;
  margin-right: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`

const LabelContainer2 = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
`

const ButtonContainer = styled.div`
  width: 180px;
  display: flex;
  justify-content: flex-end;
`

const StyledImage = styled.img`
  display: none;
  align-self: center;

  @media (min-width: 500px) {
    display: flex;
    width: 45px;
    height: 45px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 65px;
    height: 65px;
  }
`

const StyledImageHolder = styled.div`
  align-self: center;
  @media (min-width: 500px) {
    width: 45px;
    height: 45px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 65px;
    height: 65px;
  }
`

const StyledArrow = styled.img`
  display: none;
  align-self: center;

  @media (min-width: 500px) {
    display: flex;
    width: 12px;
    height: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 24px;
    height: 24px;
  }
`

const NumberHolder = styled.div`
  position: absolute;
  align-self: center;
  display: flex;
  border-radius: 50%;
  top: 28px;
  align-items: center;
  justify-content: center;
  @media (min-width: 500px) {
    width: 45px;
    height: 45px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 65px;
    height: 65px;
  }
`

const StyledNumber = styled.div`
  opacity: 0;
  font-weight: 800;

  @media (min-width: 500px) {
    opacity: 1;
    line-height: 0px;
    font-size: 30px;
    margin-right: 1px;
    margin-bottom: 20px;
    color: white;
    z-index: 1;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
    margin-right: 1px;
    margin-bottom: 0px;
  }
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  pool,
  stakeToken,
  earnToken,
  tier,
  removed,
  sousId,
  earnTokenImage,
  showExpandableSection,
}) => {
  const { t } = useTranslation()
  const { userData, tokenPerBlock, totalStaked } = pool
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const allowance = userData?.allowance
  const rawEarningsBalance = getBalanceNumber(earnings, 18)
  const displayBalance = rawEarningsBalance
    ? rawEarningsBalance.toLocaleString(undefined, { maximumFractionDigits: 4 })
    : '?'
  const isLoading = !pool.userData
  const { account } = useWeb3React()
  const bananaPerDay = BLOCKS_PER_DAY.times(new BigNumber(tokenPerBlock)).div(totalStaked).toFixed(3)

  const cardHeaderButton = () => {
    if (!account) {
      return <UnlockButton sx={{ fontWeight: 600, fontSize: '11.5px' }} />
    }
    if (!allowance) {
      return (
        <ApprovalAction nfaStakingPoolContract={pool.contractAddress[CHAIN_ID]} sousId={sousId} isLoading={isLoading} />
      )
    }
    if (allowance && !accountHasStakedBalance) {
      return (
        <StakeAction
          pool={pool}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
          tier={tier}
        />
      )
    }
    return <HarvestActions earnings={earnings} sousId={sousId} isLoading={isLoading} tokenDecimals={18} />
  }

  return (
    <Flex>
      <StyledBackground>
        <StyledImageHolder>
          <NumberHolder>
            <StyledNumber>{tier}</StyledNumber>
          </NumberHolder>
          <Image rarityTier={tier} borderRadius="50%" hideTier />
        </StyledImageHolder>
        <StyledArrow src="/images/arrow.svg" alt="arrow" />
        <StyledImage src={`/images/tokens/${earnTokenImage || `${earnToken}.svg`}`} alt={earnToken} />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading>
            {t('Tier')} {tier}
          </StyledHeading>
          {!removed && (
            <Text fontWeight={600} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1>
                {t('BPD')}: {bananaPerDay}
              </StyledText1>
            </Text>
          )}
          <StyledFlexEarnedSmall>
            <StyledText4 color="primary" pr="3px">
              {t(`${earnToken}`)}
            </StyledText4>
            <StyledText2 color="primary" pr="3px">
              {t('Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>
        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText4 color="primary" pr="3px">
                {earnToken}
              </StyledText4>
              <StyledText2 color="primary" pr="3px">
                {t('Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {cardHeaderButton()}
            <ExpandableSectionButton expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
        {stakeToken === 'GNANA' && <PoolFinishedSash />}
      </StyledFlexContainer>
    </Flex>
  )
}

export default CardHeading
