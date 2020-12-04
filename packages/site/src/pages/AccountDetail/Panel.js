import { useSelector } from "react-redux";
import { accountDetailSelector } from "@store/reducers/accountDetailSlice";
import React from "react";
import PanelList from "@components/PanelList";
import { Balance } from "@components/index";

export default function Panel() {
  const account = useSelector(accountDetailSelector)

  const dataSource = [
    {
      label: 'Address',
      data: account?.address
    },
    {
      label: 'Address Type',
      data: account?.type
    },
    {
      label: 'Balance',
      data: <Balance value={account?.balance?.free}/>
    },
  ]

  return (
    <PanelList dataSource={dataSource} />
  )
}
