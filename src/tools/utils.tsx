import { Name, Person } from "./DataModels";

export const getFullName = (name: Name): string => `${name.title ?? ''} ${name.first ?? ''} ${name.last ?? ''}`

export const getFullID = (person: Person): string => 
    person.id?.name && person.id.value ? `${person.id?.name ?? ''} ${person.id?.value ?? ''}` : person.login.uuid

export const isNameValid = (name: string):boolean => name.length > 2
export const isMailValid = (email: string): boolean => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
export const isMailNew = (email: string, origin: string, allEmails: String[]): boolean => 
                          email === origin || !allEmails.find(m => m === email) ? true : false

export const modalStyle = (w: number) => ({
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: w,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  })

export const titles = [
{
    value: 'Mr',
    label: 'Mr',
},
{
    value: 'Mrs',
    label: 'Mrs',
},
{
    value: 'Ms',
    label: 'Ms',
},
{
    value: 'Miss',
    label: 'Miss',
},
{
    value: 'Monsieur',
    label: 'Monsieur',
},
]
