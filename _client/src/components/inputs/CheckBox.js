import React from "react";

const CheckBox = ({value, handler, isCheck}) => {
    return (
        <>
            <input
                id={value}
                type="checkbox" className="widget--checkbox-real"
                onChange={() => {
                    handler(value)
                }}
                checked={isCheck}
            />
            <label className="widget--checkbox-fake" htmlFor={value}>{value}</label>

        </>
    )
}

export default CheckBox