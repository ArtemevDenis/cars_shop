import React, {useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import CarCard from "../../components/cars/CarCard";
import CatalogFilter from "../../components/catalog/CatalogFilter";

const initFilter = {
    minPrice: 0,
    maxPrice: 4294967294,
    minYear: 2010,
    maxYear: 4294967294,
    minMileage: 0,
    maxMileage: 4294967294,
    brands: null
}

const Catalog = () => {
    const {request} = useHttp()
    const [cars, setCars] = useState(null)
    const [filter, setFilter] = useState(initFilter)


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

    // useEffect(() => {
    //     loadCars()
    // }, [filter])


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