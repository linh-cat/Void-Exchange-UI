import React, { useState } from "react"

import cx from "classnames"

import Card from "@components/Card/Card"
import { InputCustom } from "@components/common"
import Button from "@components/Button/Button"
import SelectTokenModal from "@components/SelectTokenModal/SelectTokenModal"
import TableCustom from "@components/Table/TableCustom"
import Modal from "@components/Modal/Modal"
import ComboBoxList from "@components/ComboBoxList/ComboBoxList"

import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import Editor from "@monaco-editor/react"
import { Tab } from "@headlessui/react"
import { Binance, Bybit, ChainLink, Coinbase, Kucoin, OKX, Void } from "@img/logo"
import Footer from "@components/Footer/Footer"

const providers = [
  {
    value: "binance",
    label: "Binance",
    effectActive: "active-binance",
    icon: Binance
  },
  {
    value: "okx",
    label: "OKX",
    effectActive: "active-okx",
    icon: OKX
  },
  {
    value: "chainlink",
    label: "Chain Link",
    effectActive: "active-chainlink",
    icon: ChainLink
  },
  {
    value: "coinbase",
    label: "Coinbase",
    effectActive: "active-coinbase",
    icon: Coinbase
  },
  {
    value: "bybit",
    label: "Bybit",
    effectActive: "active-bybit",
    icon: Bybit
  },
  {
    value: "kucoin",
    label: "Ku Coin ",
    effectActive: "active-kucoin",
    icon: Kucoin
  }
]

const MarketPage = () => {
  const [priceFeedTab, setPriceFeed] = useState(0)
  const [price, setPrice] = useState("// some comment")
  const [isShowModal, setIsShowModal] = useState(false)
  const [providersValue, setProvidersValue] = useState([providers[0]?.value])

  const onChangePrice = (event) => {
    setPrice(event)
  }

  const headerModal = <div>Modal 1</div>
  const bodyModal = <div>x + y + z</div>

  return (
    <>
      <Modal
        header={headerModal}
        body={bodyModal}
        footer={
          <div className="grid grid-cols-2 gap-3">
            <Button text="Add" className="py-1" />
            <Button text="Cancel" isDefault={false} className="border py-2" onClick={() => setIsShowModal(false)} />
          </div>
        }
        open={isShowModal}
        setOpen={setIsShowModal}
      />
      <div className="flex flex-col gap-20">
        <div className="container mx-auto max-w-4xl py-10 flex flex-col gap-5 bg-transparent px-10 2xl:px-0">
          <Card
            header={
              <div className="title flex items-center gap-3 p-3">
                <img src={Void} alt="eth" className="h-10 w-10" />
                <h1 className="text-2xl">Create Market</h1>
              </div>
            }
          >
            <div className="p-3 flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="w-1/2">
                  <SelectTokenModal label="Base Token" />
                </div>
                <div className="w-1/2">
                  <SelectTokenModal label="Quote Token" />
                </div>
              </div>
              <label className="">Price feed</label>
              <div className="border rounded overflow-hidden">
                <Tab.Group selectedIndex={priceFeedTab} onChange={setPriceFeed}>
                  <Tab.List className="w-full border-b">
                    <Tab
                      className={cx({
                        "py-3 px-5": true,
                        "active-tab": priceFeedTab === 0
                      })}
                    >
                      Provider
                    </Tab>
                    <Tab
                      className={cx({
                        "py-3 px-5": true,
                        "active-tab": priceFeedTab === 1
                      })}
                    >
                      Customized Code
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="p-3">
                    <Tab.Panel className="flex flex-col gap-3">
                      <div className="">
                        <ComboBoxList
                          options={providers}
                          value={providersValue}
                          setValue={setProvidersValue}
                          className="grid grid-cols-1 md:grid-cols-3 gap-3"
                        />
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <Editor
                        height="30vh"
                        width="100%"
                        language="javascript"
                        options={{ readOnly: false, lineNumbers: "off" }}
                        theme="vs-dark"
                        saveViewState={true}
                        onChange={onChangePrice}
                        value={price}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="ml-3">Price: 10$</div>
              </div>
              <Button text="Test Price" className="mt-1" />
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <label>Funding Fee Modal</label>
                    <div className="group-tooltip cursor-pointer">
                      <QuestionMarkCircleIcon className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <Card
                    header={
                      <div className="flex justify-between items-center py-2 px-2">
                        <div>List Modal</div>
                        <div className="border rounded py-1 px-2 text-sm ">Applied: Modal 1</div>
                      </div>
                    }
                  >
                    <div>
                      <TableCustom
                        columnDef={[
                          {
                            field: "modal1",
                            headerName: "",
                            cellRenderer: (cell) => {
                              return (
                                <div
                                  className="text-center link-color cursor-pointer py-3 px-2 text-sm"
                                  onClick={() => setIsShowModal(true)}
                                >
                                  {cell?.modal1}
                                </div>
                              )
                            }
                          },
                          {
                            field: "modal2",
                            headerName: "",
                            cellRenderer: (cell) => {
                              return (
                                <div
                                  className="text-center link-color cursor-pointer py-3 px-2 text-sm"
                                  onClick={() => setIsShowModal(true)}
                                >
                                  {cell?.modal2}
                                </div>
                              )
                            }
                          },
                          {
                            field: "modal3",
                            headerName: "",
                            cellRenderer: (cell) => {
                              return (
                                <div
                                  className="text-center link-color cursor-pointer py-3 px-2 text-sm"
                                  onClick={() => setIsShowModal(true)}
                                >
                                  {cell?.modal3}
                                </div>
                              )
                            }
                          }
                        ]}
                        data={[
                          {
                            modal1: "Modal 1",
                            modal2: "Modal 2",
                            modal3: "Modal 3"
                          }
                        ]}
                      />
                    </div>
                  </Card>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputCustom
                  type="string"
                  classNameInput="py-2 px-1"
                  label="Open Fee"
                  placeHolder="0.01%"
                  disabled={true}
                />
                <InputCustom
                  type="string"
                  classNameInput="py-2 px-1"
                  label="Close Fee"
                  placeHolder="0.01%"
                  disabled={true}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InputCustom
                  type="string"
                  classNameInput="py-2 px-1"
                  label="Trading Fee Reciver"
                  placeHolder="0x123434"
                />
                <InputCustom type="string" classNameInput="py-2 px-1" label="Liquidity" placeHolder="$1,000,000" />
              </div>
              <div>
                <Button text="Approve" />
              </div>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default MarketPage
