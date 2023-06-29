import Button from "@components/Button/Button"
import Card from "@components/Card/Card"
import { ArrowRight } from "@icons/index"
import { Discord, Void } from "@img/logo"
import { ETH } from "@img/token"

const VaultStrategy = () => {
  return (
    <div className="container mx-auto max-w-7xl mt-10 px-3 xl:px-0">
      <Card
        className="shadow"
        header={
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <img src={Void} className="w-10 h-10" alt="logo" />
              <h2 className="">Description</h2>
            </div>
            <div className="flex items-center">
              <Button
                text="Website"
                icon={<img src={ArrowRight} alt="arrow-right" className="w-3 h-3" />}
                isDefault={false}
                className="border rounded py-1 px-3"
              />
            </div>
          </div>
        }
      >
        <div className="p-3 flex flex-col gap-3">
          <p className="text-slate-300 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <div className="p-2 border rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={ETH} className="w-5 h-5" alt="token" />
              <h3>Earn SD</h3>
            </div>
            <Button
              text="Explorer"
              icon={<img src={ArrowRight} className="w-3 h-3" alt="arrow right" />}
              isDefault={false}
              className="border px-2 py-1"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default VaultStrategy
