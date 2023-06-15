import Card from "@components/Card/Card"
import { InputCustom, SelectCustom } from "@components/common"
import { VoidIcon } from "@icons/index"
import React, { useState } from "react"
import { Tab } from "@headlessui/react"
import cx from "classnames"
import Button from "@components/Button/Button"
import { Popover } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

const MarketPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
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
            <InputCustom
              type="string"
              label={
                <div>
                  <label>Base token</label>
                </div>
              }
              classNameInput="py-2 px-1"
            />
            <InputCustom
              type="string"
              label={
                <div>
                  <label>Quote token</label>
                </div>
              }
              classNameInput="py-2 px-1"
            />
          </div>
          <label className="">Price feed</label>
          <div className="border rounded overflow-hidden">
            <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
              <Tab.List className="w-full border-b">
                <Tab
                  className={cx({
                    "py-3 px-5": true,
                    "active-tab": selectedIndex === 0
                  })}
                >
                  Provider
                </Tab>
                <Tab
                  className={cx({
                    "py-3 px-5": true,
                    "active-tab": selectedIndex === 1
                  })}
                >
                  Customized Code
                </Tab>
              </Tab.List>
              <Tab.Panels className="p-3 vh-30">
                <Tab.Panel>Content 1</Tab.Panel>
                <Tab.Panel>Content 2</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="ml-3">Price: 10$</div>
          </div>
          <Button text="Test Price" className="mt-1" />
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
            <InputCustom type="string" classNameInput="py-2 px-1" label="Trading Fee Reciver" placeHolder="0x123434" />
            <InputCustom type="string" classNameInput="py-2 px-1" label="Liquidity" placeHolder="$1,000,000" />
          </div>
          <div>
            <Button text="Approve" />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default MarketPage
