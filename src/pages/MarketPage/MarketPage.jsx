import Card from "@components/Card/Card"
import { InputCustom } from "@components/common"
import React, { useState } from "react"
import cx from "classnames"
import Button from "@components/Button/Button"
import SelectTokenModal from "@components/SelectTokenModal/SelectTokenModal"
import TableCustom from "@components/Table/TableCustom"
import Modal from "@components/Modal/Modal"
import LineLoading from "@components/common/LineLoading/LineLoading"

import { VoidIcon } from "@icons/index"
import { CheckIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import Editor from "@monaco-editor/react"
import { RadioGroup, Tab } from "@headlessui/react"
import { Binance, ChainLink, OKX } from "@img/logo"

const providers = [
  {
    id: "binance",
    name: "Binance",
    icon: Binance
  },
  {
    id: "okx",
    name: "OKX",
    icon: OKX
  },
  {
    id: "chainlink",
    name: "Chain Link",
    icon: ChainLink
  }
]

const MarketPage = () => {
  const [priceFeedTab, setPriceFeed] = useState(0)
  const [price, setPrice] = useState("// some comment")
  const [isShowModal, setIsShowModal] = useState(false)
  const [provider, setProvider] = useState(providers[0])

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
      <div className="container mx-auto max-w-4xl py-10 flex flex-col gap-5 bg-transparent">
        <Card
          header={
            <div className="title flex items-center gap-3 p-3">
              <img src={VoidIcon} alt="eth" className="h-10 w-10" />
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
                  <Tab.Panel>
                    <div className="w-1/3">
                      <RadioGroup value={provider} onChange={setProvider}>
                        <div className="space-y-2">
                          {providers.map((pro) => (
                            <RadioGroup.Option
                              key={pro.name}
                              value={pro}
                              className={({ checked }) =>
                                cx("py-3 px-3 rounded cursor-pointer border", {
                                  "border-binance shadow": pro.id === "binance" && checked,
                                  "active-okx shadow": provider.id === "okx" && checked,
                                  "active-chainlink shadow": provider.id === "chainlink" && checked
                                })
                              }
                            >
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <div className="flex gap-3 items-center">
                                        <img src={pro?.icon} alt="icon" className="h-5 w-10" />
                                        <RadioGroup.Label
                                          as="p"
                                          className={cx({
                                            "font-medium": true
                                          })}
                                        >
                                          {pro.name}
                                        </RadioGroup.Label>
                                      </div>
                                    </div>
                                  </div>
                                  {pro.id === provider.id && (
                                    <div className="shrink-0">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
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
                                className="text-left link-color cursor-pointer py-3 px-2 text-sm"
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
                                className="text-left link-color cursor-pointer py-3 px-2 text-sm"
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
                                className="text-left link-color cursor-pointer py-3 px-2 text-sm"
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
            <div>
              <LineLoading isLoading={true} />
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default MarketPage
