import './App.css';
import {useState, useEffect} from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [searchField, setSearchField] = useState(''); // [value, set] // searchField will point to '' here, setSearchField IS USED FOR SETTING
  const [monsters, setMonsters] = useState([]); // [value, set] // searchField will point to '' here, setSearchField IS USED FOR SETTING
  const [newFilteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  },[]);
  
  /* if you dont include this effect then filter process will always be called even when you create some other searchbox and start typing */
  /* but we can change this to fire filter process only when searchField changes or monster array changes */
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
    console.log('effect is firing');
  }, [monsters, searchField]);

  /* this will be rendered 4 times using React 18 instead of 2 */
  console.log('rendered');

  const onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();              
    setSearchField(searchField);
  }

  return (
    <div className="App">
      <div className='app-title'>
        Monster Rolodex
      </div>
      <SearchBox 
        className = {'monsters-search-box'} 
        placeholder = {'search monsters'} 
        onChangeHandler = {onSearchChange} 
      />
      <CardList monsterList={newFilteredMonsters} />
    </div>
  )
}

// class App extends Component {

//   /* classes always run constructor first */
//   constructor(){
//     super();
//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//   }

//   /* inbuilt method runs on third position i.e. 3rd priority */
//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState( () => {
//         return {monsters: users}
//       },
//       () => {
//         /* print the exact status of the state */
//         // console.log(this.state);
//       }
//     ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();              
//     this.setState(() => {
//       return { searchField } // searchField:searchField
//     });
//   }

//   /* render runs next 2nd priority */
//   render(){
    
//     const {monsters, searchField} = this.state;
//     const {onSearchChange} = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return(
//         <div className="App">
//           <div className='app-title'>
//             Monster Rolodex
//           </div>
//           <SearchBox 
//             className = {'monsters-search-box'} 
//             placeholder = {'search monsters'} 
//             onChangeHandler = {onSearchChange} 
//           />
//           <CardList monsterList={filteredMonsters} />
//         </div>
//     );

//   }
// }

export default App;
