export type Note = {
    title:string,
    body:string
}

export type NoteWithId = {
    id:string
} & Note;

export type NoteFormProps = {
    onSubmit:(data:Note) => void
}

export type SimplifiedNote = {
    title: string
    id: string
  }

export interface TitleInterface {
    _id: string;
    title: string;
  }

export interface NoteInterface {
    _id:string | null,
    title:string |null,
    note:string |null,
}