import React, { useCallback, useMemo } from 'react'

export default function CheckBoxList({ styles, checkBoxListRef }) {

  const checkList = new Map([
    ['advertising', { select: 0, alias: "廣告投放代理", name: "advertising" }],
    ['socialMedia', { select: 0, alias: "社群口碑行銷", name: "socialMedia" }],
    ['eventPlanning', { select: 0, alias: "企業活動規劃", name: "eventPlanning" }],
    ['design', { select: 0, alias: "數位形象設計", name: "design" }],
  ])

  const checkBoxList = useMemo(() => {
    let checkBoxList = []
    checkList.forEach((value, key) => {
      checkBoxList.push(value)
    })
    console.log("🚀 ~ file: contactUs.jsx:161 ~ checkList.values ~ checkBoxList:", checkBoxList)
    return checkBoxList
  }, [checkList])

  const onCheckBoxChange = useCallback((e) => {
    console.log("🚀 ~ file: CheckBoxList.jsx:38 ~ onCheckBoxChange ~ e:", e)
    if (checkBoxListRef.current === null) {
      checkBoxListRef.current = checkList
    }
    console.log(e.target.value);
    console.log(e.target.checked);
    console.log("🚀 ~ file: contactUs.jsx:23 ~ onCheckBoxChange ~ checkBoxListRef.current:", checkBoxListRef.current)
    const originValue = checkBoxListRef.current.get(e.target.value)
    console.log("🚀 ~ file: contactUs.jsx:24 ~ onCheckBoxChange ~ originValue:", originValue)

    checkBoxListRef.current.set(e.target.value,
      Object.assign({}, originValue, { select: e.target.checked ? 1 : 0 })
    )

    console.log("🚀 ~ file: contactUs.jsx:64 ~ onCheckBoxChange ~ checkBoxListRef.current:", checkBoxListRef.current)

  }, [checkBoxListRef, checkList])

  return <div data-title="合作需求（可複選）" className={`${styles['enter-checkbox-list']}`}>
    {
      checkBoxList.map((item, index) => {
        return <div key={index} data-title={item.alias} className={`${styles['enter-checkbox']}`}>
          <input
            type='checkbox'
            value={item.name}
            onChange={onCheckBoxChange} />
        </div>
      })
    }
  </div>;
}
