import { Discord, Github, Twitter, Void } from "@img/logo"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 pb-5">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>Void Exchange</h3>
            <Link className="text-slate-500 text-sm hover-text-default">App</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Trading</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Documentation</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Security</Link>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>Void Exchange</h3>
            <Link className="text-slate-500 text-sm hover-text-default">App</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Trading</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Documentation</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Security</Link>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>Void Exchange</h3>
            <Link className="text-slate-500 text-sm hover-text-default">App</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Trading</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Documentation</Link>
            <Link className="text-slate-500 text-sm hover-text-default">Security</Link>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h3>Governance</h3>
            <Link className="text-slate-500 text-sm hover-text-default flex items-center gap-3">
              <img src={Github} alt="github" className="w-4 h-4" /> <div>Github</div>
            </Link>
            <Link className="text-slate-500 text-sm hover-text-default flex items-center gap-3">
              <img src={Discord} alt="discord" className="w-4 h-4 bg-white rounded" /> <div>Discord</div>
            </Link>
            <Link className="text-slate-500 text-sm hover-text-default flex items-center gap-3">
              <img src={Twitter} alt="twitter" className="w-4 h-4 bg-white rounded" /> <div>Twitter</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t pt-2 flex justify-between items-center max-w-7xl mx-auto px-3 xl:px-0">
        <div className="flex items-center gap-1">
          <img src={Void} alt="void icon" className="w-7 h-7" />
          <h1>Void Exchange</h1>
        </div>
        <div className="text-slate-500 text-xs">© 2023 Void Exchange, Inc.</div>
      </div>
    </div>
  )
}

export default Footer
