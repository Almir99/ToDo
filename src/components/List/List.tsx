import {FC, useState} from "react";
import {Ul, Li, TextContainer, DateContainer, ButtonContainer, Button} from "./List.styled";
import {Text} from "../UI";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faXmark, faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {UpdateForm} from "../Form/Form";
import useDayCountdownTimer from "../hooks/DayCountdownTimerHook/useDayCountdownTimer";

interface ListProps {
  data: { todo: string, date: string, id: string }[]
  deleteHandler: (id: string) => void
  updateHandler: (id: string, uT?: string, uD?: string) => void
}

const Timer: FC<{ date: string, toggle: boolean }> = ({date, toggle}) => {
  const time = useDayCountdownTimer(new Date(date))
  const timeUnits: [number, string][] = [
    [31536000000, "year"],
    [2592000000, "month"],
    [86400000, "day"],
    [3600000, "hour"],
    [60000, "minute"],
    [1000, "second"]
  ]
  const timeLeft = timeUnits.reduce((result, [unit, label]) => {
    const value = Math.floor(result.timeLeft / unit)
    result.timeLeft -= value * unit
    if (value > 0) {
      result.parts.push(`${value} ${label}${value !== 1 ? "s" : ""}`)
    }
    return result
  }, {timeLeft: time, parts: [] as string[]})

  return (
    <Text interaction="none"
          fontSize={"14px"}>{toggle ? "Task finished" : timeLeft.parts.length > 0 ? timeLeft.parts.join(", ") + " left" : "You ran out of time for that task"}</Text>
  )
}

const ItemText: FC<{ todo: string, date:string }> = ({todo, date}) => {
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <>
      <TextContainer>
        <Text interaction="pointer" onClick={() => setToggle(prevState => !prevState)} lineThroughText={toggle}
              fontSize={"25px"} $fontWeight={"600"}>
          {`${todo} `}
        </Text>
      </TextContainer>
      <DateContainer>
        <Timer date={date} toggle={toggle}/>
      </DateContainer>
    </>
  )
}


export const List: FC<ListProps> = ({data, deleteHandler, updateHandler}) => {

  const [state, setState] = useState<{ updating: boolean, id: string, todo: string, date: string }>({
    updating: false,
    id: "",
    todo: "",
    date: ""
  })

  const Update = (_id: string, _todo: string, _date: string) => {
    setState(prevState => ({...prevState, updating: !prevState.updating, id: _id, todo: _todo, date: _date}))
  }

  return state.updating ? <>
      <UpdateForm onSubmit={updateHandler} todo={state.todo} date={state.date} updating={setState} id={state.id}/>
    </> :
    <Ul>
      {data.map((items) => (
        <Li key={items.id}>
          <ItemText todo={items.todo} date={items.date}/>
          <ButtonContainer>
            <Button onClick={() => Update(items.id, items.todo, items.date)} edit={true}><FontAwesomeIcon
              icon={faPenToSquare}/></Button>
            <Button onClick={() => deleteHandler(items.id)} del={true}><FontAwesomeIcon icon={faXmark}/></Button>
          </ButtonContainer>
        </Li>
      ))}
    </Ul>
}

export default List