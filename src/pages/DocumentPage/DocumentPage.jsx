import React from "react"
import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import { ArrowRight, BracketIcon, CloudIcon, ComputerIcon, GithubMarkIcon } from "@icons/index"

const DocumentPage = () => {
  return (
    <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5">
      <h2 className="font-medium text-4xl">Developers</h2>
      <div className="bg-banner relative shadow border rounded vh-40">
        <div className="absolute top-1/2 left-0 flex flex-col gap-3 px-6">
          <h3 className="font-medium text-2xl tracking-wider">Documentation</h3>
          <div className="text-lg tracking-wider">
            Click here to jump our API endpoint docs - where you can retreieve infomation about any orders books
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card hasShadow={true} className={"cursor-pointer"}>
          <div className="p-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={ComputerIcon} alt="computer" className="w-10 h-10" />
              <h5 className="font-medium">What is Lighters?</h5>
            </div>
            <div className="text-slate-500 text-sm">Learn about Lighers and how it work?</div>
          </div>
        </Card>
        <Card hasShadow={true} className={"cursor-pointer"}>
          <div className="p-7 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <img src={BracketIcon} alt="bracket" className="w-10 h-10" />
              <h5 className="font-medium">SDK</h5>
            </div>

            <div className="text-slate-500 text-sm">
              Click here to jump to our API endpoint docs - where you can retrieve information about any orders books.
            </div>
          </div>
        </Card>
        <Card hasShadow={true} className={"cursor-pointer"}>
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
        </Card>
      </div>
      <div className="btn-gr flex gap-5">
        <Button
          text={"Github"}
          isDefault={false}
          className={"border border-white px-5 rounded btn-github py-2"}
          icon={<img src={GithubMarkIcon} alt="github" className="w-5 h-5" />}
        />
        <Button
          text={"Feedback"}
          icon={<img src={ArrowRight} alt="arrow-right" className="w-5 h-5" />}
          isDefault={false}
          className={"border border-white px-5 rounded btn-feedback py-2"}
        />
      </div>
    </div>
  )
}

export default DocumentPage
