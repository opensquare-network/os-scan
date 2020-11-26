import { shortStr } from "../utils";
import { NavLink } from "react-router-dom";
import React from "react";

export default function AddressLink({ addr, truncate = true }) {
  let text = addr
  if (truncate) {
    text = shortStr(addr, 6)
  }

  return (
    <NavLink
      to={`/accounts/${addr}`}
    >
      {text}
    </NavLink>
  )
}
