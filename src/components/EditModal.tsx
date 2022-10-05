import { useState } from 'react';
import consts_eng from '../tools/consts_eng';
import { ID, Name, Person } from '../tools/DataModels';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getFullName, isMailNew, isMailValid, isNameValid, modalStyle, titles } from '../tools/utils';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import "./EditModal.scss";

interface EditModalProps {
  person: Person
  allEmails: string[]
  updatePerson: (name: Name, email: string, id?: ID, uuid?: string) => void
}

const EditModal = (props: EditModalProps) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false)
  const [title, onChangeTitle] = useState<string>(props.person.name.title)
  const [firstName, onChangeFirstName] = useState<string>(props.person.name.first)
  const [lastName, onChangeLastName] = useState<string>(props.person.name.last)
  const [email, onChangeEmail] = useState<string>(props.person.email)

  const isFormValid = (): boolean => isNameValid(firstName) && isNameValid(lastName) && isMailValid(email) && isMailNew(email, props.person.email, props.allEmails)

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
      onChange={(e) => onChangeTitle(e.target.value)}
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
        defaultValue={`${props.person.name.first}`}
        sx={{ width: '20ch' }}
        onChange={(e) => onChangeFirstName(e.target.value)}
        error={!isNameValid(firstName)}
        helperText={!isNameValid(firstName) ? consts_eng.greater : ''}
      />
      <TextField
        required
        error={!isNameValid(lastName)}
        id="outlined-required"
        label={consts_eng.lastName}
        defaultValue={`${props.person.name.last}`}
        sx={{ width: '20ch' }}
        onChange={(e) => onChangeLastName(e.target.value)}
        helperText={!isNameValid(lastName) ? consts_eng.greater : ''}
      />
    </span>
    

  const emailEdit = () =>  
    <TextField
      required
      error={!isMailValid(email) || !isMailNew(email, props.person.email, props.allEmails)}
      id="outlined-required"
      label={consts_eng.email}
      defaultValue={props.person.email}
      sx={{ width: '55ch' }}
      onChange={(e) => onChangeEmail(e.target.value)}
      helperText={!isMailValid(email) || !isMailNew(email, props.person.email, props.allEmails) ? consts_eng.invalid : ''}
    />

  const onCancel = () => {
    onChangeTitle(props.person.name.title)
    onChangeFirstName(props.person.name.first)
    onChangeLastName(props.person.name.last)
    onChangeEmail(props.person.email)
    onSetIsModalShown()
  }

  const editPerson = () => {
    props.updatePerson({title, first: firstName, last: lastName}, email, props.person.id, props.person.login?.uuid)
    onSetIsModalShown()
  }

  return (
    <div>
      <Button variant="outlined" onClick={() => onSetIsModalShown()}>{consts_eng.edit}</Button>
      <Modal
        open={isModalShown}
        onClose={() => onSetIsModalShown()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(600)}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {`${consts_eng.edit} ${getFullName(props.person.name)}`}
          </Typography>
          <div className='textField'>
            {getTitleDropDown()}
            {nameEdit()}
          </div>
          <div className='textField'>
            {emailEdit()}
          </div>
          <div className='modalButtons'>
            <Button variant="contained" className='button' disabled={!isFormValid()} onClick={(e) => editPerson()}>{consts_eng.approve}</Button>
            <Button variant="outlined" className='button' onClick={() => onCancel()}>{consts_eng.cancel}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default EditModal;