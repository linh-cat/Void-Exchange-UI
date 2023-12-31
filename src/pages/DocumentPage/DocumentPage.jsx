import React from "react"
import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import { ArrowRight, BracketIcon, CloudIcon, ComputerIcon } from "@icons/index"
import Footer from "@components/Footer/Footer"
import { Github } from "@img/logo"
import SEO from "@components/common/SEO"
import { getPageTitle } from "src/lib/utils"
import { Link } from "react-router-dom"

const DocumentPage = () => {
  return (
    <SEO title={getPageTitle("Document")}>
      <div className="flex flex-col gap-20">
        <div className="container mx-auto max-w-7xl py-10 flex flex-col gap-5 px-10 2xl:px-0">
          <h2 className="font-medium text-4xl">Developers</h2>
          <Link
            className="bg-banner relative shadow border rounded vh-40"
            target="blank"
            to="https://docs.void.exchange/"
          >
            <div className="absolute top-1/2 left-0 flex flex-col gap-3 px-6">
              <h3 className="font-medium text-2xl tracking-wider">Documentation</h3>
              <div className="text-lg tracking-wider">
                Click here to jump our API endpoint docs - where you can retreieve infomation about any orders books
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card hasShadow={true}>
              <Link className="p-7 flex flex-col gap-5" target="_blank" to="/">
                <div className="flex items-center gap-3 hover:border-slate-500">
                  <img src={ComputerIcon} alt="computer" className="w-10 h-10" />
                  <h5 className="font-medium">Void Exchange foundation</h5>
                </div>
                <div className="text-slate-500 text-sm">Learn about Void Exchange and how it work?</div>
              </Link>
            </Card>
            <Card hasShadow={true} className={"cursor-pointer"}>
              <Link className="p-7 flex flex-col gap-5" to="/" target="_blank">
                <div className="flex items-center gap-3">
                  <img src={BracketIcon} alt="bracket" className="w-10 h-10" />
                  <h5 className="font-medium">SDK</h5>
                </div>

                <div className="text-slate-500 text-sm">
                  Click here to jump to our API endpoint docs - where you can retrieve information about any orders
                  books.
                </div>
              </Link>
            </Card>
            <Card hasShadow={true} className={"cursor-pointer"}>
              <Link className="p-7 flex flex-col gap-5" to="/" target="_blank">
                <div className="flex items-center gap-3">
                  <img src={CloudIcon} alt="Smart contract" className="w-10 h-10" />
                  <h5 className="font-medium">Smart Contracts</h5>
                </div>

                <div className="text-slate-500 text-sm">
                  What contract functions are available client-side? Click here to see a summary of the Factory, Router,
                  & Order contracts.
                </div>
              </Link>
            </Card>
          </div>
          <div className="btn-gr flex gap-5">
            <Button
              text={"Github"}
              isDefault={false}
              className={"border border-white px-5 rounded btn-github py-2 cursor-pointer"}
              icon={<img src={Github} alt="github" className="w-5 h-5" />}
            />
            <Button
              text={"Feedback"}
              icon={<img src={ArrowRight} alt="arrow-right" className="w-5 h-5" />}
              isDefault={false}
              className={"border border-white px-5 rounded btn-feedback py-2 cursor-pointer"}
            />
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  )
}

export default DocumentPage
