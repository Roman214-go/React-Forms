import React, { FocusEvent, ChangeEvent, MouseEvent } from 'react'
import { updateBreak } from 'typescript'

const App = () => {
  const [email, setEmail] = React.useState('')
  const [emailDirty, setEmailDirty] = React.useState(false)
  const [emailError, setEmailError] = React.useState('Поле Email должно быть заполнено')
  
  const [userName, setUserName] = React.useState('')
  const [userNameDirty, setUserNameDirty] = React.useState(false)
  const [userNameError, setUserNameError] = React.useState('Поле Фамилия и имя должно быть заполнено')

  const [telephone, setTelephone] = React.useState('+7')
  const [telephoneDirty, setTelephoneDirty] = React.useState(false)
  const [telephoneError, setTelephoneError] = React.useState('Поле Телефон должно быть заполнено')

  const [date, setDate] = React.useState('')
  const [dateDirty, setDateDirty] = React.useState(false)
  const [dateError, setDateError] = React.useState('Поле Дата рождения должно быть заполнено')

  const [massage, setMassage] = React.useState('')
  const [massageDirty, setMassageDirty] = React.useState(false)
  const [massageError, setMassageError] = React.useState("Поле Сообщение должно быть заполнено")  

  const [serverState, setServerState] = React.useState("")

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    switch(e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'userName':
        setUserNameDirty(true)
        break
      case 'telephone':
        setTelephoneDirty(true)
        break
      case 'date':
        setDateDirty(true)
        break
      case 'massage':
        setMassageDirty(true)
      }

  }


  const userNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    
    setUserName(e.target.value.toUpperCase())      
    const userSplit = e.target.value.split(" ")
    if (!userSplit[0]) {
      setUserNameDirty(true)
      setUserNameError("Поле Фамилия и имя должно быть заполнено")  
    }
    else if (userSplit.length != 2 ||
        !(userSplit[0].length > 2 && userSplit[0].length < 31) ||
        !(userSplit[1].length > 2 && userSplit[1].length < 31)) {
      setUserNameDirty(true)
      setUserNameError("Поле должно содержать только фамилию и имя")
    }
    else {
      setUserNameError("")
    }
  }

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (e.target.value == "") {
      setEmailDirty(true)
      setEmailError("Поле Email должно быть заполенено")
    }
    else if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailDirty(true)
      setEmailError("Некорректный email")
    }  
    else {
      setEmailError("")
      
    }
  }
  const telephoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTelephone(e.target.value)
    const re = /((8|\+7)-?)?\(?\d{3}\)?-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}-?\d{1}/
    if (e.target.value == "") {
      setEmailDirty(true)
      setTelephoneError("Поле Телефон не должно быть пустым")
    }
    else if (!re.test(e.target.value)) {
      setTelephoneDirty(true)
      setTelephoneError("Не корректно введен номер телефона")
    }  
    else {
      setTelephoneError("")
    }    
  }
  
  const dateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
    if (e.target.value) {
      setDateDirty(true)
      setDateError("")  
    } else {
      setDateDirty(true)
      setDateError("Поле Дата рождения должно быть заполнено")      
    }
  }

  const massageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMassage(e.target.value)
    if (e.target.value == "") {
      setMassageDirty(true)
      setMassageError("Поле Сообщение должно быть заполнено")
    } 
    else if (e.target.value.length < 10) {
      setMassageDirty(true)
      setMassageError("Сообщение должно содержать больше 10 символов")
    }
    else {
      setMassageError("")
    }
    
  }

  const serverRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (emailError == "" && userNameError == "" && telephoneError == "" && dateError == "" && massageError == "" && userNameDirty) {
    if (email.length < 20) {
      const error = ["error"]
      setServerState(JSON.stringify(error))
    } 
    else {
      const success = ["success"]
      setServerState(JSON.stringify(success))
    }
    setUserName("")
    setEmail("")
    setDate("")
    setTelephone("")
    setMassage("")
    console.log(serverState);
    
  }
  }

  return (
    <div className='form-cont'>
      <form className='form'>
        <h1>Форма обратной связи</h1>
        <div className="inputs-cont">
              <div className="input-cont">
                <div className='input-info'><p>Фамилия и имя</p>
                {(userNameDirty && userNameError) && <div className='error-massage'>{userNameError}</div>}
                </div>
                <input value={userName} name="userName" type="text" placeholder="Ваша фамилия и имя" onBlur={e => blurHandler(e)} onChange={e => userNameHandler(e)}/>
              </div>

              <div className="input-cont">
                <div className='input-info'><p>Email</p>
                {(emailDirty && emailError) && <div className='error-massage'>{emailError}</div>}
                </div>
                <input value={email} name="email" type="email" placeholder="Email..." onBlur={e => blurHandler(e)} onChange={e => emailHandler(e)}/>
              </div>

              <div className="input-cont">
                <div className='input-info'><p>Телефон</p>
                {(telephoneDirty && telephoneError) && <div className='error-massage'>{telephoneError}</div>}
                </div>
                <input value={telephone} name="telephone" type="tel" onBlur={e => blurHandler(e)} onChange={e => telephoneHandler(e)}/>
              </div>

              <div className="input-cont">
                <div className='input-info'><p>Дата рождения</p>
                {(dateDirty && dateError) && <div className='error-massage'>{dateError}</div>}
                </div><input value={date} name="date" type="date" onBlur={e => blurHandler(e)} onChange={e => dateHandler(e)}/>
              </div>

              <div className="input-cont">
                <div className='input-info'><p>Сообщение</p>
                {(massageDirty && massageError) && <div className='error-massage'>{massageError}</div>}
                </div>
                <input value={massage} name="massage" type="text" minLength={10} maxLength={300} onBlur={e => blurHandler(e)} onChange={e => massageHandler(e)}/>
              </div>
          </div>
          <button type='submit' onClick={e => serverRequest(e)}>ОТПРАВИТЬ</button>
      </form>
      <div className={serverState ? "server-massage" : "server-massage-disabled"}>
        {
          serverState && (<p>{JSON.parse(serverState)}</p>)
        }
      </div>
    </div>
  )
}

export default App