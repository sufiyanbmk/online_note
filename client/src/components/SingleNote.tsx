import { useEffect, useState } from "react"
import { Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { getdata } from "../axios/Api"
import { NoteInterface } from "../types/NoteData"

const SingleNote = () => {
    const params= useParams()
    const navigate = useNavigate()
    const [notes, setNotes] = useState<NoteInterface | null>(null)
    const id = params.id;

    useEffect(() => {
        getdata(`/getNotes?id=${id}`).then((res) => {
            if (res.data.success) {
                setNotes(res?.data.notes)
            }
        })
    }, [])
    const markdownContent = notes?.note || '';

    function deleteHandler(id:string | null | undefined) {
        getdata(`/deleteNote/${id}`).then(() => {
            // if (res.data.success) {
            //     const updatedList = notes.filter((note) => note._id !== id);
            //     setNotes(updatedList)
            // } else {
            //     toast.warning('something went wrong')
            // }
            navigate('/')
        })
    }
    return (
        <>
        <Row className="align-items-center mb-4">
          <Col>
            <h1>{notes?.title}</h1>
          </Col>
          <Col xs="auto">
            <Stack gap={2} direction="horizontal">
              <Link to={`/edit`}>
                <Button variant="primary">Edit</Button>
              </Link>
              <Button
                onClick={() => {
                    deleteHandler(notes?._id)
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
              <Link to="/">
                <Button variant="outline-secondary">Back</Button>
              </Link>
            </Stack>
          </Col>
        </Row>
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </>
    )
}

export default SingleNote