import DetailWrapper from "@components/DetailWrapper";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccount, accountDetailSelector } from "@store/reducers/accountDetailSlice";
import Breadcrumb from "@components/Breadcrumb";
import AccountDetailPanel from "@pages/AccountDetail/Panel";
import ExtrinsicsAndFundAndHunt from "@pages/AccountDetail/ExtrinsicsAndFundAndHunt";
import ObjectMissing from "@components/ObjectMissing";

export default function AccountDetail() {
  const { address } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (address) {
      dispatch(fetchAccount(address))
    }
  }, [dispatch, address])

  const account = useSelector(accountDetailSelector)

  const breadcrumb = (
    <Breadcrumb
      dataSource={[
        { to: '/accounts', label: 'Accounts' },
        { label: 'Account Details' }
      ]}
    />
  )

  if (!account) {
    return <ObjectMissing>No Data</ObjectMissing>
  }

  return (
    <DetailWrapper>
      {breadcrumb}
      <AccountDetailPanel />
      <ExtrinsicsAndFundAndHunt />
    </DetailWrapper>
  )
}
