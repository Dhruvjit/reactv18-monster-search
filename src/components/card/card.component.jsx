import "./card.styles.css"

const Card = (props) => {
    const {name, email, id} = props.monster;
    return(
        <div>
            <div className='card-container' key={id}>
                <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set4&size=180x180`} />
                <h2>{name}</h2>
                <p>{email}</p>
            </div>  
        </div>
    )
}

export default Card;