import cx from "classnames"
import { CheckIcon } from "@heroicons/react/24/solid"

const ComboBoxList = ({ options, value = [], className, setValue }) => {
  const onHandleChange = (provider) => {
    const updatedSelection = [...value]
    if (updatedSelection.includes(provider)) {
      // Item already exists, so let's remove it
      updatedSelection.splice(updatedSelection.indexOf(provider), 1)
    } else {
      // Item doesn't exist, let's add it
      updatedSelection.push(provider)
    }
    setValue(updatedSelection)
  }

  return (
    <div className={cx(className)}>
      {options?.map((o) => (
        <div
          className={cx(
            {
              "value-item flex items-center justify-between  border px-3 py-2 rounded shadow cursor-pointer": true
            },
            o?.effectActive
          )}
          onClick={() => onHandleChange(o.value)}
        >
          <div className="flex items-center gap-2">
            <img src={o?.icon} alt="icon" className="h-6 w-6" />
            <label className="text-sm cursor-pointer">{o?.label}</label>
          </div>
          {value?.includes(o?.value) && <CheckIcon className="w-6 h-6" />}
        </div>
      ))}
    </div>
  )
}

export default ComboBoxList
