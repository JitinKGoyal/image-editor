import React, { useState } from 'react'
import { baseUrl } from '../../config'
import { loggedInUserId } from '../../utils/loggedInUserId'

function Note(props) {
    // const userId = JSON.parse(localStorage.getItem("clouNotebookCreds"))._id

    // destructuring
    const { _id, title, description, tag } = props.note

    async function deleteNote() {
        const response = await fetch(`${baseUrl}/notes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: loggedInUserId,
                id: _id
            })
        })
        const data = await response.json()
        console.log(data)
        props.getNotes()
    }

    function editBtnFunc() {
       props.noteEdit(title, description, tag, _id)
    }

    return (
        <>
           
            <section>
                <p className='text-white tag'>{tag}</p>
                <div class="heart" onClick={deleteNote}><i class="fas fa-trash"></i></div>
                <div class="card">
                    <h3>{title}</h3>
                    <p></p>
                    <p>{description}</p>
                </div>

                <button type="button" class="buy-btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onClick={editBtnFunc}>edit</button>

            </section>

          

        </>
    )
}

export default Note