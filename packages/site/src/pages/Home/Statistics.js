import React from "react";
import { useSelector } from "react-redux";
import { latestHeightSelector } from "@store/reducers/latestBlockSlice";
import {
  totalAccountsSelector,
  totalExtrinsicsSelector,
  totalBountiesSelector,
  totalBountiesApplyingSelector,
  totalBountiesResolvedSelector,
} from "@store/reducers/statisticSlice";
import styled from "styled-components"

const Wrapper = styled.div`
  margin-top: 12px;
  display: flex;
  flex-flow: wrap;
  background-color: white;
  color: #4a4a4a;

  & > div {
    padding: 1.25rem;
    border: 1px solid #DEDEDE;
    flex: 1;
    flex-shrink: 3;
    flex-basis: 30%;

    &:not(:first-of-type) {
    }

    & > div.title {
      line-height: 1.5;
      font-weight: bold;
      padding-bottom: 10px;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 930px) {
    & > div {
      flex-basis: 50%;
    }
  }
`

function StatisticItem({ title, content }) {
  return (
    <div>
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  )
}

export default function Statistics() {
  const latestHeight = useSelector(latestHeightSelector)
  const totalAccounts = useSelector(totalAccountsSelector)
  const totalExtrinsics = useSelector(totalExtrinsicsSelector)
  const totalBounties = useSelector(totalBountiesSelector)
  const totalBountiesApplying = useSelector(totalBountiesApplyingSelector)
  const totalBountiesResolved = useSelector(totalBountiesResolvedSelector)
  return (
    <Wrapper>
      <StatisticItem title="Latest Block Height" content={latestHeight} />
      <StatisticItem title="Total Extrinsics" content={totalExtrinsics} />
      <StatisticItem title="Total Accounts" content={totalAccounts} />
      <StatisticItem title="Total Bounties" content={totalBounties} />
      <StatisticItem title="Total Bounties Applying" content={totalBountiesApplying} />
      <StatisticItem title="Total Bounties Resolved" content={totalBountiesResolved} />
    </Wrapper>
  )
}