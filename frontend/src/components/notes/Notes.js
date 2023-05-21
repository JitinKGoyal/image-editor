import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../config'
import { loggedInUserId } from '../../utils/loggedInUserId'
import Note from './Note'

import "./notes.css"

function Notes() {

    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tag, setTag] = useState("")
    const [notes, setNotes] = useState([])
    const [isUpdating, setIsUpdating] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("my-image-editor"));
        if (data?._id) {
            getNotes();
        } else {
            navigate("/login")
        }

    }, [])

    async function addNote() {

        if (isUpdating) {

            const response = await fetch(`${baseUrl}/notes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    description: description,
                    tag: tag
                })
            })
            const data = await response.json()
            backToAdd()

        } else {

            const response = await fetch(`${baseUrl}/notes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: loggedInUserId,
                    title: title,
                    description: description,
                    tag: tag
                })
            })
            const data = await response.json()

        }
        getNotes();
    }

    async function getNotes() {
        const response = await fetch(`${baseUrl}/notes/${loggedInUserId}`)
        const notes = await response.json();
        setNotes(notes)
    }

    function noteEdit(title, description, tag, id) {
        setTitle(title)
        setDescription(description)
        setTag(tag)
        setId(id)
        setIsUpdating(true)
    }

    function backToAdd() {
        setIsUpdating(false)
        setTitle("")
        setDescription("")
        setTag("")
        setId("")
    }

    return (
        <>

            <div className='note-prt pt-3'>
                <button type="button" class="btn add_btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">+</button>

                <div className='d-flex justify-content-around align-items-start flex-wrap'>
                    {notes.map(e => (
                        <Note note={e} getNotes={getNotes} noteEdit={noteEdit} />
                    ))}

                </div>
            </div>


            <div class="modal fade addNote" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog w-75" role="document">
                    <div class="modal-content">


                        <div class="modal-header pb-0">
                            <h5 class="modal-title" id="exampleModalLabel">
                                <img src="/images/icons/icons8-note-94.png" alt="add note" title='add note' height="40" />
                                preserve your thoughts here
                            </h5>
                            <button className='btn btn-danger m-3 shadow float-right' data-dismiss="modal" onClick={backToAdd} style={{position:"relative",top:"-20px"}} >X</button>
                        </div>
                        <div class="modal-body py-0">
                            <form>
                                <div class="form-group d-flex justify-content-between">
                                    {/* <label for="recipient-name" class="col-form-label">Recipient:</label> */}
                                    <input type="text" class="mr-1" title='title' id="recipient-name" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                                    <input type="text" class="ml-1" title='tag' id="recipient-name" placeholder='Tag' value={tag} onChange={e => setTag(e.target.value)} />
                                </div>

                                <div class="form-group">
                                    {/* <label for="message-text" class="col-form-label">Message:</label> */}
                                    <textarea class="" id="message-text" placeholder='Your note' rows="14" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer pt-0">
                            <button type="button" class="btn btn-info" data-dismiss="modal" onClick={addNote}>{isUpdating ? "Udapte note" : "Add note"}</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Notes