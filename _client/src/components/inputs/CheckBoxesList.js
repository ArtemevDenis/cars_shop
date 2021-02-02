import React, {useEffect, useState} from 'react'
import CheckBox from "./CheckBox";

const CheckBoxesList = ({list, setList, title}) => {

    const [objectList, setObjectList] = useState({})

    const checkHandler = (name) => {
        const newObjList = Object.assign({}, objectList)
        if (newObjList[name])
            newObjList[name] = !newObjList[name]
        else
            newObjList[name] = true
        setObjectList(newObjList)
    }

    const setData = () => {
        const output = []
        for (let key of Object.keys(objectList)) {
            if (objectList[key] === true) {
                output.push(key)
            }
        }
        setList(output)
    }

    useEffect(() => {
        setData()
    }, [objectList])


    return (
        <div className="filters--widget widget">
            <p className="widget--title">{title}</p>
            <div className="widget--checkbox-block">
                {list && list.map((list, index) =>
                    <CheckBox key={index} value={list.name} handler={checkHandler}/>
                )}
            </div>
        </div>

    )
}

export default CheckBoxesList