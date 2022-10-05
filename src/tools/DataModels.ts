export interface Person {
    name: Name
    email: string
    location: Location
    id?: ID
    login: {
      uuid: string
    }
    picture: {
        medium: string
      }
  }
  
export  interface Name {
    title: string,
    first: string,
    last: string
}
  
interface Location {
  country: string
  city: string
  street: {
      name: string
  }
}

export interface ID {
  name: string
  value: string
}

export interface Title {
  value: string
  label: string
}
  