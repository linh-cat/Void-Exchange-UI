import { DiscordIcon, GithubMarkIcon, TwitterIcon, VoidIcon } from "@icons/index"
import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className="mt-20 flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        <div className="relative">
          <img
            src={VoidIcon}
            alt="void icon"
            className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h3>Void Exchange</h3>
          <Link className="text-slate-500 text-sm hover">App</Link>
          <Link className="text-slate-500 text-sm hover">Trading</Link>
          <Link className="text-slate-500 text-sm hover">Documentation</Link>
          <Link className="text-slate-500 text-sm hover">Security</Link>
        </div>
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h3>Void Exchange</h3>
          <Link className="text-slate-500 text-sm hover">App</Link>
          <Link className="text-slate-500 text-sm hover">Trading</Link>
          <Link className="text-slate-500 text-sm hover">Documentation</Link>
          <Link className="text-slate-500 text-sm hover">Security</Link>
        </div>
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h3>Void Exchange</h3>
          <Link className="text-slate-500 text-sm hover">App</Link>
          <Link className="text-slate-500 text-sm hover">Trading</Link>
          <Link className="text-slate-500 text-sm hover">Documentation</Link>
          <Link className="text-slate-500 text-sm hover">Security</Link>
        </div>
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h3>Governance</h3>
          <Link className="text-slate-500 text-sm hover flex items-center gap-3 justify-center lg:justify-start">
            <img src={GithubMarkIcon} alt="github" className="w-4 h-4" /> <div>Github</div>
          </Link>
          <Link className="text-slate-500 text-sm hover flex items-center gap-3 justify-center lg:justify-start">
            <img src={DiscordIcon} alt="discord" className="w-4 h-4 bg-white rounded" /> <div>Discord</div>
          </Link>
          <Link className="text-slate-500 text-sm hover flex items-center gap-3 justify-center lg:justify-start">
            <img src={TwitterIcon} alt="twitter" className="w-4 h-4 bg-white rounded" /> <div>Twitter</div>
          </Link>
        </div>
      </div>
      <div className="border-t pt-2">
        <div className="max-w-sm px-5">
          <div className="text-slate-500 text-xs">© 2023 Void Exchange, Inc.</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
