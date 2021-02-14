import React, {useEffect, useState} from 'react'
import CheckBox from "./CheckBox";

const CheckBoxesList = ({list, setList, title, selectedBrands, name}) => {
    const [objectList, setObjectList] = useState(selectedBrands)
    const checkHandler = (name) => {
        if (objectList.includes(name))
            setObjectList(objectList.filter(object =>
                object !== name
            ))
        else
            setObjectList([...objectList, name])
    }

    useEffect(() => {
        setList({name: name, value: objectList})
    }, [objectList])


    return (
        <div className="filters--widget widget">
            <p className="widget--title">{title}</p>
            <div className="widget--checkbox-block">
                {list && list.map((list, index) =>
                    <CheckBox
                        key={index}
                        value={list.name}
                        handler={checkHandler}
                        isCheck={(selectedBrands && Array.isArray(selectedBrands)) ? selectedBrands.indexOf(list.name) !== -1 : false}
                    />
                )}
            </div>
        </div>
    )
}

export default CheckBoxesList