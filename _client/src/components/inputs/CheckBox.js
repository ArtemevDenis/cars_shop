import React from "react";

const CheckBox = ({value, handler}) => {
    return (
        <>
            <input
                id={value}
                type="checkbox" className="widget--checkbox-real"
                onChange={() => {
                    handler(value)
                }}
            />
            <label className="widget--checkbox-fake" htmlFor={value}>{value}</label>

        </>
        // <label className='checkbox-list__item'>
        //     <input
        //         className='checkbox-list__input'
        //         type='checkbox'
        //         onChange={() => {
        //             handler(value)
        //         }}
        //     />{value}
        // </label>


    )
}

export default CheckBox