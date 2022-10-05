import { useEffect, useState } from "react";
import { ID, Name, Person } from "../tools/DataModels";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import consts_eng from "../tools/consts_eng";

import "./MainPage.scss";
import EditModal from "./EditModal";
import { getFullID, getFullName } from "../tools/utils";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";

const MainPage = () => {
  const [allPersons, setAllPersons] = useState<Person[]>([])

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=10`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((response) => {
        setAllPersons(response.results)
      })
      .catch((error) => console.log(error));
  }, []);
  
  const addNewPerson = (person: Person) => {
    setAllPersons([...allPersons, person])
  }

  const UpdatePerson = (name: Name, email: string, id?: ID, uuid?: string) => {
    const newState = allPersons.map(person => {
      if (person.id === id || person.login?.uuid === uuid) {
        return {...person, name, email};
      }

      return person;
    })

    setAllPersons(newState);
  }

  const deletePerson = (person: Person) => {
    setAllPersons(allPersons.filter(p => p !== person))
  }

  const getAllEmails = (): string[] => allPersons.map((person) => person.email)

  const getTableHeaders = (): JSX.Element => 
    <TableRow className="tableHeaders">
      <TableCell>{consts_eng.name}</TableCell>
      <TableCell align="right">{consts_eng.email}</TableCell>
      <TableCell align="right">{consts_eng.userImage}</TableCell>
      <TableCell align="right">{consts_eng.location}</TableCell>
      <TableCell align="right">{consts_eng.id}</TableCell>
      <TableCell align="right" />
      <TableCell align="right" />
    </TableRow>

  const getTableBody = (): JSX.Element =>
    <TableBody className="tableBody">
      {allPersons.map((person) => (
        <TableRow
          key={person.email}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {getFullName(person.name)}
          </TableCell>
          <TableCell align="right">{person.email}</TableCell>
          <TableCell align="right">
            <img
              src={person.picture.medium}
              alt={consts_eng.noImg}
              loading="lazy"
            />
          </TableCell>
          <TableCell align="right">{`${person.location.country} ${person.location.city} ${person.location.street.name}`}</TableCell>
          <TableCell align="right">{getFullID(person)}</TableCell>
          <TableCell align="right"><EditModal person={person} allEmails={getAllEmails()} updatePerson={UpdatePerson}/></TableCell>
          <TableCell align="right"><DeleteModal person={person} deletePerson={deletePerson}/></TableCell>
        </TableRow>
      ))}
    </TableBody>

  return (
    <div>
      <AddModal allEmails={getAllEmails()} addNewPerson={addNewPerson}/>
      <TableContainer className="mainPage" component={Paper} style={{width: "80%" }}>
        <Table aria-label="simple table">
          <TableHead className="tableHeaders">
            {getTableHeaders()}
          </TableHead>
            {getTableBody()}
        </Table>
      </TableContainer>
    </div>
  )
}

export default MainPage;