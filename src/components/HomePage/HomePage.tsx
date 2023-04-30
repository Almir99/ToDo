import {Text} from "../UI";
import {Container, Span} from "./HomePage.styled";
import List from "../List/List";
import {FC, useState} from "react";
import {Form} from "../Form/Form";


type DataProps = {
  todo:string,
  date:string,
  id:string
}[]

interface SubmitProps{
  todo:string,
  date:string,
  id:string
}

const HomePage:FC = () => {

  const currentTimestamp = Date.now();
  const timezoneOffset = new Date().getTimezoneOffset();
  const InitialData =[
    {todo:"Plan a weekend getaway", date:new Date(currentTimestamp - (timezoneOffset * 60 * 1000) + 7*24*3600*1000), id:"1"},
    {todo:"Learn a new language", date:new Date(currentTimestamp - (timezoneOffset * 60 * 1000) + 365*24*3600*1000), id:"2"},
  ]

  const [data, setData] = useState<DataProps>(() => {
    const localData = localStorage.getItem("todoData");
    return localData ? JSON.parse(localData) : InitialData;
  });

  const AddTodo = (data:SubmitProps) =>{
    setData((prevState) => {
      const newData = [...prevState, data];
      localStorage.setItem("todoData", JSON.stringify(newData));
      return newData;
    });
  }

  const Delete = (id:string) => {
    const removeData = data.filter(value => value.id !== id)
    localStorage.setItem("todoData", JSON.stringify(removeData));
    setData(removeData)
  }
  const Update = (id:string, updateToDO = "Some thing", updateDate = "yyyy-mm-dd" ) => {

    const UpdatedData = data.map(obj => {
      if (obj.id === id) {
        return {...obj, todo: updateToDO, date:updateDate};
      }

      return obj;
    });

    localStorage.setItem("todoData", JSON.stringify(UpdatedData));
    setData(UpdatedData);
  }

  return (
    <Container>
      <Text fontSize={"60px"} $fontWeight={"bold"}>To Do <Span>List</Span></Text>
      <Form onSubmit={AddTodo}/>
      <List data={data} deleteHandler={Delete} updateHandler={Update}/>
    </Container>
  )
}

export default HomePage