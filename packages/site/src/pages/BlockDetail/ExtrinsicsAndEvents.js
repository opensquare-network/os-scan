import React from "react";
import Box from "@components/Box";
import Nav from "@pages/BlockDetail/Nav";
import { useLocation } from "react-router";
import Extrinsics from "@pages/BlockDetail/Extrinsics";
import Events from "@pages/BlockDetail/Events";

export default function ExtrinsicsAndEvents() {
  const { pathname } = useLocation()
  const isEvent = (pathname || '').endsWith('/events')

  return (
    <Box>
      <Nav />
      {
        isEvent ?
          <Events /> : <Extrinsics />
      }
    </Box>
  )
}
