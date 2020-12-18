import Spinner from "@components/Spinner";
import React from "react";

export default function CommonDetailLoading({ breadcrumb }) {
  return (
    <>
      {breadcrumb}
      <div style={{ padding: '10%' }}>
        <Spinner />
      </div>
    </>
  )
}
