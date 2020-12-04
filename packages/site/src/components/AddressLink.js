import { shortStr } from "../utils";
import { NavLink } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router";

export default function AddressLink({ addr, truncate = true, allowLinkToSelf = true }) {
  const { pathname } = useLocation()
  const linkTo = `/accounts/${addr}`

  let text = addr
  if (truncate) {
    text = shortStr(addr, 6)
  }

  if (!allowLinkToSelf && (pathname === linkTo || pathname.startsWith(`${linkTo}/`))) {
    return <div>{text}</div>
  } else {
    return (
      <NavLink
        to={`/accounts/${addr}`}
      >
        {text}
      </NavLink>
    )
  }
}
