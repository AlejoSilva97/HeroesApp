import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {

    const location =useLocation();
    const {q = ''} = queryString.parse(location.search);

    const initialForm = {
        searchInput: q
    }

    const [inputValues, handleInputChange] = useForm( initialForm );

    const {searchInput} = inputValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`?q=${searchInput}`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />
                    
                    <form onSubmit={handleSearch}>

                        <input 
                            type="text" 
                            placeholder="Search your hero!"
                            className="form-control"
                            name="searchInput"
                            value={searchInput}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-info"
                        >
                            Search
                        </button>

                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    { 
                    (q === '') 
                        &&
                        <div className="alert alert-info">
                            Search a hero...
                        </div>
                    }

                    { 
                    (q !== '' && heroesFiltered.length === 0) 
                        &&
                        <div className="alert alert-danger">
                            There is no a hero with { q }
                        </div>
                    }

                    {
                        heroesFiltered.map((hero) => {
                            return <HeroCard 
                                key={hero.id}
                                {...hero} 
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
