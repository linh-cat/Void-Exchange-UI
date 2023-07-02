import cx from "classnames"

const Banner = ({ id, bg, currentVault, capacity, icon, title }) => {
  return (
    <div className={cx({ banner: true }, bg)}>
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-5 px-3 md:px-0">
        <div className="flex flex-col gap-3 w-full md:w-2/5">
          <h1 className="font-medium text-3xl">{title}</h1>
          <div className="flex flex-col w-full rounded relative overflow-hidden">
            <div className="current-deposit flex justify-between">
              <h3 className="text-slate-500 whitespace-nowrap">Current Vault Deposits</h3>
              <div className="whitespace-nowrap">{currentVault}</div>
            </div>
            <div className="rank relative mt-3 mb-5">
              <div className="current absolute top-0 w-1/2 h-2 bg-white z-10"></div>
              <div className="max absolute top-0 w-full h-2 bg-white"></div>
            </div>
            <div className="max-vault flex justify-between">
              <h3 className="text-slate-500 whitespace-nowrap">Max Vault Capacity</h3>
              <div className="whitespace-nowrap">{capacity}</div>
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
