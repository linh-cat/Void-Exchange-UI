import React from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import cx from "classnames"

const Modal = ({ open, setOpen, body, footer, header, disabled, className, isBorder = true }) => {
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={disabled ? () => {} : closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70 pointer-events-none" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cx(
                    "w-full max-w-md transform overflow-hidden rounded p-6 align-middle shadow-xl transition-all",
                    { card: !className, border: isBorder },
                    className
                  )}
                >
                  <div className="text-left">{header}</div>
                  <div className="mt-2">{body}</div>
                  <div className="mt-4">{footer}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
