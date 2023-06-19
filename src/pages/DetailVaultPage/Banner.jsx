import cx from "classnames"

const Banner = ({ bg, currentVault, capacity, icon, title }) => {
  return (
    <div className={cx({ banner: true }, bg)}>
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col gap-7 col-span-2 w-96">
          <h2 className="font-medium text-5xl">{title}</h2>
          <div className="capacity flex flex-col">
            <div className="current-deposit flex justify-between">
              <label className="text-slate-500">Current Vault Deposits</label>
              <div>{currentVault}</div>
            </div>
            <div className="rank relative mt-3 mb-5">
              <div className="current absolute top-0 w-1/2 h-2 bg-white z-10"></div>
              <div className="max absolute top-0 w-full h-2 bg-white"></div>
            </div>
            <div className="max-vault flex justify-between">
              <label className="text-slate-500">Max Vault Capacity</label>
              <div>{capacity}</div>
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
