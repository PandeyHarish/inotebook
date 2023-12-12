import React , {useContext} from 'react'
import noteContext from '../context/notes/NotesContext'
const About = () => {
const a  = useContext(noteContext);
  return (
    <div>
      <h1>this is about {a.name}</h1>
    </div>
  )
}

export default About
