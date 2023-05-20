import CardWrapper from "@components/CardWrapper/CardWrapper"
import React from "react"
import "./Document.css"
import { BracketIcon, CloudIcon, ComputerIcon } from "@icons/index"
import Button from "@components/Button/Button"

const Document = () => {
  return (
    <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5">
      <h2 className="font-medium text-4xl">Developers</h2>
      <div className="doc-banner relative shadow border border-slate-500 rounded">
        <div className="absolute top-1/2 left-0 flex flex-col gap-3 px-6">
          <h3 className="font-medium text-2xl tracking-wider">Documentation</h3>
          <div className="text-lg tracking-wider">
            Click here to jump our API endpoint docs - where you can retreieve infomation about any orders books
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CardWrapper hasShadow={true} className={"cursor-pointer"}>
          <div className="p-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={ComputerIcon} alt="computer" className="w-10 h-10" />
              <h5 className="font-medium">What is Lighters?</h5>
            </div>
            <div className="text-slate-500 text-sm">Learn about Lighers and how it work?</div>
          </div>
        </CardWrapper>
        <CardWrapper hasShadow={true} className={"cursor-pointer"}>
          <div className="p-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={BracketIcon} alt="bracket" className="w-10 h-10" />
              <h5 className="font-medium">SDK</h5>
            </div>

            <div className="text-slate-500 text-sm">
              Click here to jump to our API endpoint docs - where you can retrieve information about any orders books.
            </div>
          </div>
        </CardWrapper>
        <CardWrapper hasShadow={true} className={"cursor-pointer"}>
          <div className="p-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={CloudIcon} alt="Smart contract" className="w-10 h-10" />
              <h5 className="font-medium">Smart Contracts</h5>
            </div>

            <div className="text-slate-500 text-sm">
              What contract functions are available client-side? Click here to see a summary of the Factory, Router, &
              Order contracts.
            </div>
          </div>
        </CardWrapper>
      </div>
      <div className="btn-gr flex gap-5">
        <Button text={"Github"} />
        <Button text={"Feedback"} />
      </div>
    </div>
  )
}

export default Document
