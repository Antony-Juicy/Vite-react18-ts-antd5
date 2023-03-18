import React, { useState } from 'react'

type Units = {
  [key: string]: number
}

const storageUnits: Units = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
}

const StorageConverter = () => {
  const [inputValue, setInputValue] = useState<number>(0)
  const [unit, setUnit] = useState<string>('B')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim()
    if (/^\d+$/.test(input)) {
      setInputValue(Number(input))
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value)
  }

  /**
   * @date  2023-03-14
   * @value   value
   * @from     单位
   * @to      转换的单位
   */
  const convert = (value: number, from: keyof Units, to: keyof Units) =>
    (value * storageUnits[from]) / storageUnits[to]

  let convertedValue = convert(inputValue, unit, 'B')
  console.log(convertedValue, 'convertedValue')
  let displayUnit = unit

  if (convertedValue >= storageUnits.TB) {
    convertedValue /= storageUnits.TB
    displayUnit = 'TB'
  } else if (convertedValue >= storageUnits.GB) {
    convertedValue /= storageUnits.GB
    displayUnit = 'GB'
  } else if (convertedValue >= storageUnits.MB) {
    convertedValue /= storageUnits.MB
    displayUnit = 'MB'
  } else if (convertedValue >= storageUnits.KB) {
    convertedValue /= storageUnits.KB
    displayUnit = 'KB'
  }

  function fun(n: any, o: any) {
    console.log(o, '0000===')
    return {
      fun: function (m: any) {
        return fun(m, n)
      },
    }
  }
  let c = fun(0).fun(1)
  c.fun(2)
  c.fun(3)

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <select value={unit} onChange={handleSelectChange}>
        {Object.keys(storageUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
      <div>{`${convertedValue.toFixed(2)} ${displayUnit}`}</div>
    </div>
  )
}

export default StorageConverter
