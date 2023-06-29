import cx from "classnames"

const Banner = ({ bg, currentVault, capacity, icon, title }) => {
  return (
    <div className={cx({ banner: true }, bg)}>
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="flex flex-col gap-5 col-span-2 w-96">
          <h1 className="font-medium text-3xl">{title}</h1>
          <div className="capacity flex flex-col">
            <div className="current-deposit flex justify-between">
              <h3 className="text-slate-500">Current Vault Deposits</h3>
              <div>{currentVault}</div>
            </div>
            <div className="rank relative mt-3 mb-5">
              <div className="current absolute top-0 w-1/2 h-2 bg-white z-10"></div>
              <div className="max absolute top-0 w-full h-2 bg-white"></div>
            </div>
            <div className="max-vault flex justify-between">
              <h3 className="text-slate-500">Max Vault Capacity</h3>
              <div>{capacity}</div>
            </div>
          </div>
          <div className="flex items-center justify-between border rounded p-2 shadow">
            <div>
              <h3 className="text-slate-500">Rewards</h3>
              <div>2 ETH</div>
            </div>
            <div>
              <h3 className="text-slate-500">ENDS</h3>
              <div>17D 15H 13M</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={icon} alt="icon" className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export default Banner
