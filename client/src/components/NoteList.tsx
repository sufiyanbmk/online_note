import { useMemo, useState, useEffect } from "react"
import {
    Button,
    Col,
    Form,
    Row,
    Stack,
  } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getdata } from "../axios/Api"
import { TitleInterface } from "../types/NoteData"
import NoteCard from "./Card"

const NoteList = () => {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState<TitleInterface[] | null>(null);

    useEffect(() => {
        getdata('/get-titles').then((res) => {
            console.log(res)
            if (res.data.success) {
                setNotes(res?.data.notes)
            }
        })
    }, [])

    const filteredNotes = useMemo(() => {
        return notes?.filter(note => {
          return (
            (title === "" ||
              note.title.toLowerCase().includes(title.toLowerCase()))
          )
        })
      }, [title, notes])
    
    return (
        <>
        <Row>
            <Col>
            <h1>Notes </h1>
            </Col>
            <Col xs="auto">
                <Stack gap={2} direction="horizontal">
                <Link to="/new-note">
              <Button variant="primary">Create</Button>
            </Link>
                </Stack>
            </Col>
        </Row>
        <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes?.map(note => (
          <Col key={note._id}>
            <NoteCard id={note._id} title={note.title} />
          </Col>
        ))}
      </Row>
        </>
    )
}

export default NoteList;