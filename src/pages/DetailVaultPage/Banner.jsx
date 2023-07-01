import cx from "classnames"

const Banner = ({ id, bg, currentVault, capacity, icon, title, blurBg }) => {
  return (
    <div className={cx({ banner: true }, bg)}>
      <div className="container mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-4 gap-5 justify-between items-center">
        <div className="lg:col-span-3">
          <h1 className="font-medium text-3xl mb-3">{title}</h1>
          <div className="flex flex-col xl:flex-row items-center gap-10 px-3 lg:px-0">
            <div className="capacity flex flex-col w-full md:w-1/2 2xl:w-2/5 border py-3 px-3 rounded shadow relative overflow-hidden">
              <img src={blurBg} className="blur" alt="icon" />
              <div className="current-deposit flex justify-between">
                <h3 className="text-slate-500 whitespace-nowrap">Current Vault Deposits</h3>
                <div className="whitespace-nowrap">{currentVault}</div>
              </div>
              <div className="rank relative mt-3 mb-5">
                <div className="current absolute top-0 w-1/2 h-1 bg-white z-10"></div>
                <div className="max absolute top-0 w-full h-1 bg-white"></div>
              </div>
              <div className="max-vault flex justify-between">
                <h3 className="text-slate-500 whitespace-nowrap">Max Vault Capacity</h3>
                <div className="whitespace-nowrap">{capacity}</div>
              </div>
            </div>
            {/* right */}
            <div className="w-full md:w-1/2 2xl:w-1/3 border rounded p-3 flex flex-col gap-3 shadow relative overflow-hidden">
              <img src={blurBg} className="blur" alt="icon" />
              <h3>Reward Distribution</h3>

              <div className={cx("flex items-center justify-between rounded text-sm ", {})}>
                <div>
                  <h3 className={cx("text-white", {})}>Rewards</h3>
                  <div className="text-sm">2 ETH</div>
                </div>
                <div>
                  <h3 className={cx("text-white", {})}>ENDS</h3>
                  <div className="text-sm text-slate-300">17D 15H 13M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={icon} alt="icon" className="w-1/2 h-full mx-auto" />
        </div>
      </div>
    </div>
  )
}

export default Banner
