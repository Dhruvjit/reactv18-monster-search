import Card from '../card/card.component';
import './card-list.styles.css';

const CardList = (props) => {
    const {monsterList} = props;
    return (
        <div className='card-list'>
            {
                monsterList.map((monster) => {
                    return (
                        <Card key={monster.id} monster={monster} /> 
                    )
                })
            }
        </div>
    )
}

export default CardList;