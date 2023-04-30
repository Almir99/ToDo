import {ChangeEvent, useEffect, useState} from "react";

interface FormValue {
  todo: string,
  date: string,
  id: string
}

export const useFormField = (initValue: FormValue) => {
  const [value, setValue] = useState<FormValue>(initValue)
  const [valid, setValid] = useState<string[]>([])
  const [offsetDate, setOffsetDate] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(prevState => ({...prevState, [e.target.name]: e.target.value}))
  }

  useEffect(() => {
    setValid(value.date.split('-'))
  }, [value.date])

  useEffect(()=>{
    if(value.date ===  "yyyy-mm-dd"){
      return
    }
    const dateString = new Date(value.date);
    const timezoneOffset = dateString.getTimezoneOffset();
    setOffsetDate(new Date(dateString.getTime() - (timezoneOffset * 60 * 1000)).toISOString().slice(0, 16))
  },[value])
  return {
    value,
    valid,
    offsetDate,
    handleChange,
    setValue
  }
}

export default useFormField