import {Container, Inputs, Button} from "./Form.styled";
import {Dispatch, SetStateAction, FC, SyntheticEvent, useRef, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import useFormField from "../hooks/FormHook/useFormField"


const initValue = {
  todo: "",
  date: "yyyy-mm-dd",
  id: ""
}



interface FormValue {
  todo: string,
  date: string,
  id: string
}

interface FormProps {
  onSubmit: (data: FormValue) => void
}

interface UpdateProps {
  onSubmit: (id: string, uT?: string, uD?: string) => void
  id: string
  todo: string
  date: string
  updating: Dispatch<SetStateAction<{ updating: boolean; id: string; todo: string; date: string; }>>


}

const Form: FC<FormProps> = ({onSubmit}) => {
  const currentTimestamp = Date.now();
  const timezoneOffset = new Date().getTimezoneOffset();
  const {value, valid, offsetDate, handleChange, setValue} = useFormField(initValue)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(inputRef && inputRef.current ){
      inputRef.current.focus()
    }
  },[])

  const submitHandler = (data: SyntheticEvent) => {
    data.preventDefault()
    onSubmit({...value, id: Math.random().toString()})
    setValue({...initValue, date: value.date})
  }


  return (
    <Container onSubmit={submitHandler}>
      <Inputs type="text" name={"todo"} onChange={handleChange} value={value.todo} ref={inputRef}/>
      <Inputs type="datetime-local" name={"date"} onChange={handleChange} value={value.date === "yyyy-mm-dd"? new Date(currentTimestamp - (timezoneOffset * 60 * 1000)).toISOString().slice(0, 16) : offsetDate}/>
      <Button type={"submit"}
              disabled={(valid[0] === "yyyy" || Number(valid[0]) < new Date().getFullYear() || Number(valid[0]) > new Date().getFullYear() + 100) || valid[1] === "mm" || (Number(valid[1]) < new Date().getMonth() + 1 && valid[0] === "2023") || valid[2] === "dd" || (Number(valid[2]) < new Date().getDate() && Number(valid[1]) === new Date().getMonth() + 1 && valid[0] === "2023") || value.todo.trim() === "" || /^\s*$/.test(value.todo)}>
        Add to List
      </Button>
    </Container>
  )
}

const UpdateForm: FC<UpdateProps> = ({onSubmit, updating, id, todo, date}) => {
  const currentTimestamp = Date.now();
  const timezoneOffset = new Date().getTimezoneOffset();
  const {value, valid ,offsetDate ,handleChange, setValue} = useFormField({...initValue, todo})

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(()=>{
    if(inputRef && inputRef.current ){
      inputRef.current.focus()
    }
  },[])

  const submitHandler = (data: SyntheticEvent) => {
    data.preventDefault()
    if (value.todo.trim() === "" && value.date === "yyyy-mm-dd") {
      onSubmit(id, todo, date)
    } else if (value.todo.trim() === "") {
      onSubmit(id, todo, value.date)
    } else if (value.date === "yyyy-mm-dd") {
      onSubmit(id, value.todo, date)
    } else {
      onSubmit(id, value.todo, value.date)
    }
    updating(prevState => ({...prevState, updating: !prevState.updating}))
    setValue({...initValue})
  }


  return (
    <Container onSubmit={submitHandler}>
      <Inputs type="text" name={"todo"} onChange={handleChange} value={value.todo} ref={inputRef}/>
      <Inputs type="datetime-local" name={"date"} onChange={handleChange} value={value.date === "yyyy-mm-dd"? new Date(currentTimestamp - (timezoneOffset * 60 * 1000)).toISOString().slice(0, 16) : offsetDate}/>
      <div>
        <Button type={"submit"}
                disabled={(Number(valid[0]) < new Date().getFullYear() || Number(valid[0]) > new Date().getFullYear() + 100) || (Number(valid[1]) < new Date().getMonth() + 1 && valid[0] === "2023") || (Number(valid[2]) < new Date().getDate() && Number(valid[1]) === new Date().getMonth() + 1 && valid[0] === "2023")}>
          Update the To Do
        </Button>
        <Button onClick={() => updating(prevState => ({...prevState, updating: !prevState.updating}))}><FontAwesomeIcon
          icon={faXmark}/></Button>
      </div>
    </Container>
  )
}

export {Form, UpdateForm}