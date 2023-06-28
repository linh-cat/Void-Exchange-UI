import Modal from "@components/Modal/Modal"
import React from "react"

const PlaceOrderModal = ({ header, body, footer, disabled, open, setOpen }) => {
  return <Modal open={open} setOpen={setOpen} disabled={disabled} header={header} body={body} footer={footer} />
}

export default PlaceOrderModal
