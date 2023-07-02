import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import { ArrowRight } from "@icons/index"
import { Void } from "@img/logo"
import { ETH } from "@img/token"

import cx from "classnames"

const VaultStrategy = () => {
  return (
    <div className="container mx-auto max-w-7xl mt-10 px-3 xl:px-0">
      <Card
        className="shadow"
        header={
          <div className="flex flex-col sm:flex-row items-center justify-between p-3">
            <div className="">
              <h2 className="">Description</h2>
            </div>
            <div className="flex items-center gap-3">
              <Button
                text="Earn SD"
                icon={<img src={Void} className="w-5 h-5" alt="token" />}
                isDefault={false}
                className="border px-2 py-1"
              />
              <Button
                text="Explorer"
                icon={<img src={ArrowRight} className="w-3 h-3" alt="arrow right" />}
                isDefault={false}
                className="border px-2 py-1"
              />
              <Button
                text="Website"
                icon={<img src={ArrowRight} alt="arrow-right" className="w-3 h-3" />}
                isDefault={false}
                className="border rounded py-1 px-3 cursor-pointer"
              />
            </div>
          </div>
        }
      >
        <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="rounded p-3 flex flex-col gap-3 shadow border relative overflow-hidden">
            <img src={ETH} className="blur-img" alt="icon" />
            <h3 className="text-title-section">Reward Distribution</h3>

            <div className={cx("flex items-center justify-between rounded text-sm ", {})}>
              <div>
                <h3 className={cx("text-slate-500", {})}>Rewards</h3>
                <div className="">2 ETH</div>
              </div>
              <div>
                <h3 className={cx("text-slate-500", {})}>ENDS</h3>
                <div className="text-sm ">17D 15H 13M</div>
              </div>
            </div>
          </div>
          <p className="text-slate-300 text-sm col-span-2 break-all">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          </p>
        </div>
      </Card>
    </div>
  )
}

export default VaultStrategy
