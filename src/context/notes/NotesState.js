import { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {
  const noteInitial = [
    {
      _id: "6575af3ddd8fb2e9b382d3d5",
      user: "657306d0c6f92726c5f8a40c",
      title: "this is the updated title ",
      description: "this is the decscription",
      tag: "test",
      date: "2023-12-10T12:29:49.230Z",
      __v: 0,
    },
    {
      _id: "6575b007dd8fb2e9b382d3d8",
      user: "657306d0c6f92726c5f8a40c",
      title: "this is the title",
      description: "this is the decscription",
      tag: "test",
      date: "2023-12-10T12:33:11.643Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(noteInitial);
  return <NoteContext.Provider value={{notes,setNotes}}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
