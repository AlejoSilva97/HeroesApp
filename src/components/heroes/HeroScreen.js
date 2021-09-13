import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {

    const {heroeid} = useParams();
    const hero = useMemo(() => getHeroById(heroeid), [heroeid]);
    //const hero = getHeroById(heroeid);

    if(!hero){
        return <Redirect to="/" />
    }

    const handleReturn = () => {
        if(history.length <= 2){
            history.push('/');
        }else{
            history.goBack();
        }
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img 
                    // src={`../assets/heroes/${heroeid}.jpg`}
                    src={ heroImages(`./${heroeid}.jpg`).default }
                    alt={superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8" >
                <h3>{superhero}</h3>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Alter Ego: <b>{alter_ego}</b></li>
                    <li className="list-group-item">Publisher: <b>{publisher}</b></li>
                    <li className="list-group-item">First Appearance: <b>{first_appearance}</b></li>
                </ul>

                <h5 className="mt-3">Characters</h5>
                <p>{characters}</p>

                <button 
                    className="btn btn-outline-info"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
