import React from "react"
import Modal from "@components/Modal/Modal"

const CLosingModal = ({ open, setOpen, disabled, header, body, footer }) => {
  return <Modal open={open} setOpen={setOpen} header={header} body={body} disabled={disabled} footer={footer} />
}

export default CLosingModal
