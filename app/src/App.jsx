import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResult/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");
  
  const fetchFoodData = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const json = await response.json();
      // console.log(json);
      setData(json);
      setFilterData(json);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setError("Something went wrong in fetching the url!");
    }
  }

  useEffect(() => {
    fetchFoodData();
  }, [])

  console.log(data);

  if (error) return <div>{error}</div>
  if (loading) return <div>loading...</div>

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    if(searchValue === "")
      setFilterData(null);

    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));
    setFilterData(filter);
  }

  const filterFoodOnButton = (type) => {
    if(type === "all") {
      setFilterData(data);
      setSelectedBtn(type);
      return;
    }

    const filter = data?.filter((food) => 
    food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filter);
    setSelectedBtn(type);
  }

  const filterArr = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ]

  return (
    <>
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="/images/Foody Zone.svg" alt="logo" />
        </div>
        <div className='search'>
          <input onChange={searchFood} type="text" placeholder='Search Food'/>
        </div>
      </TopContainer>

      <FilterContainer>
        {/* <Button onClick={() => filterFoodOnButton("all")}>All</Button>
        <Button onClick={() => filterFoodOnButton("breakfast")}>Breakfast</Button>
        <Button onClick={() => filterFoodOnButton("Lunch")}>Lunch</Button>
        <Button onClick={() => filterFoodOnButton("dinner")}>Dinner</Button> */}

        {
        filterArr?.map((value) => (
          <Button 
          isSelected = {selectedBtn === value.type}
          key={value.name} onClick={() => filterFoodOnButton(value.type)}>{value.name}</Button>
        ))
      }
      </FilterContainer>

      
    </Container>
    <SearchResult 
    data = {filterData}/>
    </>
  )
}

export default App;
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  .search input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    outline: none;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;

    &::placeholder {
      color: white;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({isSelected}) => isSelected ? "#c62f2f" : "#ff4343"} ;
  outline: 1px solid ${({isSelected}) => isSelected ? "#fff" : "#ff4343"} ;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:hover{
    background-color: #c62f2f;
  }
`;