import { DiscordIcon, GithubMarkIcon, TwitterIcon, VoidIcon } from "@icons/index"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 pb-5">
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>Void Exchange</h3>
            <Link className="text-slate-500 text-sm hover">App</Link>
            <Link className="text-slate-500 text-sm hover">Trading</Link>
            <Link className="text-slate-500 text-sm hover">Documentation</Link>
            <Link className="text-slate-500 text-sm hover">Security</Link>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>Void Exchange</h3>
            <Link className="text-slate-500 text-sm hover">App</Link>
            <Link className="text-slate-500 text-sm hover">Trading</Link>
            <Link className="text-slate-500 text-sm hover">Documentation</Link>
            <Link className="text-slate-500 text-sm hover">Security</Link>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3>Void Exchange</h3>
            <Link className="text-slate-500 text-sm hover">App</Link>
            <Link className="text-slate-500 text-sm hover">Trading</Link>
            <Link className="text-slate-500 text-sm hover">Documentation</Link>
            <Link className="text-slate-500 text-sm hover">Security</Link>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h3>Governance</h3>
            <Link className="text-slate-500 text-sm hover flex items-center gap-3">
              <img src={GithubMarkIcon} alt="github" className="w-4 h-4" /> <div>Github</div>
            </Link>
            <Link className="text-slate-500 text-sm hover flex items-center gap-3">
              <img src={DiscordIcon} alt="discord" className="w-4 h-4 bg-white rounded" /> <div>Discord</div>
            </Link>
            <Link className="text-slate-500 text-sm hover flex items-center gap-3">
              <img src={TwitterIcon} alt="twitter" className="w-4 h-4 bg-white rounded" /> <div>Twitter</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t pt-2 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-1">
          <img src={VoidIcon} alt="void icon" className="w-7 h-7" />
          <h1>Void Exchange</h1>
        </div>
        <div className="text-slate-500 text-xs">© 2023 Void Exchange, Inc.</div>
      </div>
    </div>
  )
}

export default Footer
