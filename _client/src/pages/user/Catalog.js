import React, {useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import CarCard from "../../components/cars/CarCard";
import CatalogFilter from "../../components/catalog/CatalogFilter";

const Catalog = () => {
    const {request} = useHttp()
    const [cars, setCars] = useState(null)
    const [filter, setFilter] = useState({})


    const buildRequestParams = () => {
        const tmpParams = []
        for (const [key, value] of Object.entries(filter)) {
            tmpParams.push(`${key}=${value}`);
        }
        return `?${tmpParams.join('&')}`

    }

    const loadCars = () => {
        request(`/api/v1/cars${buildRequestParams()}`)
            .then(setCars)
    }


    const filterEdit = (newFilter) => {
        setFilter(newFilter)
    }

    return (
        <section className='content'>
            <h2>Каталог товаров</h2>
            <div className='catalog'>
                <div className='catalog__list'>
                    {cars &&
                    cars.map((car, index) =>
                        <CarCard
                            key={index}
                            car={car}/>)
                    }
                </div>
                <div className='catalog__aside-filter'><CatalogFilter filterEdit={filterEdit} loadCars={loadCars}/>
                </div>
            </div>
        </section>

    )
}

export default Catalog