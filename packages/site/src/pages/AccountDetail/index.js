import DetailWrapper from "@components/DetailWrapper";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { fetchAccount } from "@store/reducers/accountDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import AccountDetailPanel from "@pages/AccountDetail/Panel";
import Box from "@components/Box";
import Nav from "@pages/AccountDetail/Nav";
import ExtrinsicsAndFundAndHunt from "@pages/AccountDetail/ExtrinsicsAndFundAndHunt";

export default function AccountDetail() {
  const { address } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (address) {
      dispatch(fetchAccount(address))
    }
  }, [dispatch, address])

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/accounts', label: 'Accounts' },
        { label: 'Account Details' }
      ]}
    />
  )

  return (
    <DetailWrapper>
      {breadcrumb}
      <AccountDetailPanel />
      <ExtrinsicsAndFundAndHunt />
    </DetailWrapper>
  )
}
