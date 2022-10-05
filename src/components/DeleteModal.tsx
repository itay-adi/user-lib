import Button from '@mui/material/Button';
import { useState } from 'react';
import consts_eng from '../tools/consts_eng';
import { Person } from '../tools/DataModels';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { modalStyle } from '../tools/utils';

interface DeleteModalProps {
  person: Person
  deletePerson: (person: Person) => void
}

const DeleteModal = (props: DeleteModalProps) => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false)

  const onSetIsModalShown = () => {
    setIsModalShown(!isModalShown)
  }

  return (
    <div>
      <Button variant="outlined" color="error" onClick={() => onSetIsModalShown()}>{consts_eng.delete}</Button>
      <Modal
        open={isModalShown}
        onClose={() => onSetIsModalShown()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle(400)}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
            {`${consts_eng.delete}?`}
          </Typography>
          <div className='modalButtons'>
            <Button variant="contained" className='button' onClick={() => props.deletePerson(props.person)}>{consts_eng.approve}</Button>
            <Button variant="outlined" className='button' onClick={() => onSetIsModalShown()}>{consts_eng.cancel}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default DeleteModal;