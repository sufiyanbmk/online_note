import { FormEvent, useRef } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {  postForm } from '../axios/Api';
import toast from 'react-hot-toast'

const NoteForm = () => {
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)
    const navigate = useNavigate()
    const noteId=null
    // const [noteId, setNoteId] = useState(null)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const data = {
          title: titleRef.current!.value,
          body:bodyRef.current!.value
        }
        if(noteId){
          postForm('/addNote', {noteId,note: data}).then((res) => {
              if (res?.data.success) {
                  // if (res.data.notes) {
                  //     setNotes(res.data.notes)
                  // }
                  // setNewNote('')
                  toast.success('Note added succesfully')
              } else {
                  toast.error('something went wrong')
              }   
          }) 
      }else{
          postForm('/addNote', {noteId:null,note: data}).then((res) => {
              if (res?.data.success) {
                  // if (res.data.notes) {
                  //     setNotes(res.data.notes)
                  // }
                  // setNewNote('')
                  toast.success('Note added succesfully')
              } else {
                  toast.error('something went wrong')
              }
          })
      }
            
        navigate('..')
    }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control ref={bodyRef} required as='textarea' rows={15} />
            </Form.Group>
          </Col>
        </Row>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
            <Link to="..">
            <Button type="button" variant="outline-secondary">Cancel</Button>
            </Link>
            <Button type="submit" variant="primary">Save</Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
