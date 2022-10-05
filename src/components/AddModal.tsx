import { useState } from 'react';
import Button from '@mui/material/Button';
import consts_eng from '../tools/consts_eng';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { isMailNew, isMailValid, isNameValid, modalStyle, titles } from '../tools/utils';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { v4 as uuid } from 'uuid';

import "./AddModal.scss";
import { Name, Person } from '../tools/DataModels';

interface AddModalProps {
  allEmails: string[]
  addNewPerson: (person: Person) => void
}

const AddModal = (props: AddModalProps) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false)
  const [title, onSetTitle] = useState<string>('')
  const [firstName, onSetFirstName] = useState<string>('')
  const [lastName, onSetLastName] = useState<string>('')
  const [email, onSetEmail] = useState<string>('')
  const [img, onSetImg] = useState<string>('')
  const [country, onSetCounty] = useState<string>('')
  const [city, onSetCity] = useState<string>('')
  const [streetName, onSetStreetName] = useState<string>('')

  const isFormValid = (): boolean => 
    title !== '' && isNameValid(firstName) && isNameValid(lastName) && isMailValid(email) && isMailNew(email, '', props.allEmails)

  const onSetIsModalShown = () => {
    setIsModalShown(!isModalShown)
  }

  const getTitleDropDown = () => 
    <TextField
      id="outlined-select-currency"
      select
      label="Title"
      value={title}
      sx={{ width: '14ch' }}
      onChange={(e) => onSetTitle(e.target.value)}
    >
      {titles.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
  </TextField>

  const nameEdit = () =>
    <span>
      <TextField
        required
        id="outlined-required"
        label={consts_eng.firstName}
        sx={{ width: '20ch' }}
        onChange={(e) => onSetFirstName(e.target.value)}
        error={!isNameValid(firstName)}
        helperText={!isNameValid(firstName) ? consts_eng.greater : ''}
      />
      <TextField
        required
        error={!isNameValid(lastName)}
        id="outlined-required"
        label={consts_eng.lastName}
        sx={{ width: '20ch' }}
        onChange={(e) => onSetLastName(e.target.value)}
        helperText={!isNameValid(lastName) ? consts_eng.greater : ''}
      />
    </span>

  const emailEdit = () =>  
  <TextField
    className='email'
    required
    error={!isMailValid(email) || !isMailNew(email, '', props.allEmails)}
    id="outlined-required"
    label={consts_eng.email}
    sx={{ width: '55ch' }}
    onChange={(e) => onSetEmail(e.target.value)}
    helperText={!isMailValid(email) || !isMailNew(email, '', props.allEmails) ? consts_eng.invalid : ''}
  />

  const imgEdit = () =>  
  <TextField
    className='image'
    required
    id="outlined-required"
    label={consts_eng.img}
    sx={{ width: '55ch' }}
    onChange={(e) => onSetImg(e.target.value)}
  />

  const getAddressP1 = () =>
    <span>
      <TextField
        required
        id="outlined-required"
        label={consts_eng.country}
        sx={{ width: '20ch' }}
        onChange={(e) => onSetCounty(e.target.value)}
        error={!isNameValid(firstName)}
        helperText={!isNameValid(firstName) ? consts_eng.greater : ''}
      />
      <TextField
        required
        error={!isNameValid(lastName)}
        id="outlined-required"
        label={consts_eng.city}
        sx={{ width: '20ch' }}
        onChange={(e) => onSetCity(e.target.value)}
        helperText={!isNameValid(lastName) ? consts_eng.greater : ''}
      />
    </span>

const getAddressP2 = () =>
  <span>
    <TextField
      required
      id="outlined-required"
      label={consts_eng.street}
      sx={{ width: '20ch' }}
      onChange={(e) => onSetStreetName(e.target.value)}
      error={!isNameValid(firstName)}
      helperText={!isNameValid(firstName) ? consts_eng.greater : ''}
    />
  </span>



  const onCancel = () => {
    onSetTitle('')
    onSetFirstName('')
    onSetLastName('')
    onSetEmail('')
    onSetImg('')
    onSetCounty('')
    onSetCity('')
    onSetStreetName('')

    onSetIsModalShown()
  }

  const addNewPerson = () => {
    let name: Name = {title, first: firstName, last: lastName}
    const unique_id = uuid();
    const small_id = unique_id.slice(0,20)

    let newPerson: Person = {
      name,
      email,
      location: {
        country,
        city,
        street: {
          name: streetName
        }
      },
      picture: {
        medium: img
      },
      login: {
        uuid: small_id
      }
    }
    
    props.addNewPerson(newPerson)
    onSetIsModalShown()
  }

  return(
    <div className='addModal'>
      <Button variant="contained" onClick={() => onSetIsModalShown()} size={'large'}>{consts_eng.addNew}</Button>
      <Modal
        open={isModalShown}
        onClose={() => onSetIsModalShown()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(700)}>
          <div className='textField'>
            {getTitleDropDown()}
            {nameEdit()}
          </div>
          <div className='textField'>
            {emailEdit()}
          </div>
          <div className='textField'>
            {imgEdit()}
          </div>
          <div className='textField'>
            {getAddressP1()}
            {getAddressP2()}
          </div>
          <div className='modalButtons'>
            <Button variant="contained" className='button' disabled={!isFormValid()} onClick={(e) => addNewPerson()}>{consts_eng.approve}</Button>
            <Button variant="outlined" className='button' onClick={() => onCancel()}>{consts_eng.cancel}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AddModal;