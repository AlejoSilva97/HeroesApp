import { heroes } from '../data/Heroes';


export const getHeroesByPublisher = ( publisher ) => {
    
    //validamos que el publisher que fue enviado si exista
    const validPublishers = ['DC Comics', 'Marvel Comics'];

    //Si no encuentra el publisher enviado en nuestro validPublishers ejecuta un error
    if ( !validPublishers.includes(publisher) ) {
        throw new Error(`El publisher ${publisher} no es correcto`);
    }

    return heroes.filter( hero => hero.publisher === publisher);
}
