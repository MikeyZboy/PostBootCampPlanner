import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import { __CreateResource } from '../services/ResourceService'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const InlineForm = styled.form`
  margin: 0 auto;
  padding: 10px;
  display: inline-block;
  background-color: transparent;
  `;

const Button = styled.svg`
  display: block;
  border: transparent;
  background-color: transparent;
  color: white;
  margin: 0 auto;
  margin-top: 20px;
  padding: 5px;
  height: 40px;
  width: 40px;
`;

const ResourceForm = (props) => {
 
    const [ title, setTitle ] = useState('')
    const [ notes, setNotes ] = useState('')
    const [ link, setLink ] = useState('')
    const [ accountId, setAccountId ] = useState(props.account.id)

    const handleChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        switch (fieldName) {
          case "title":
            setTitle(fieldValue);
            break;
          case "notes":
            setNotes(fieldValue);
            break;
          case "link":
            setLink(fieldValue);
            break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        let formState = {
            link: link,
            title: title,
            notes: notes,
            account_id: accountId,
        };
        const newResource = await __CreateResource(formState);
        props.addResource(newResource);
        } catch (error) {
        throw error
        }
    };

    return (
      <div>
        <InlineForm onSubmit={handleSubmit}>
          <TextInput
            placeholder="Name"
            type="text"
            name="title"
            onChange={handleChange}
          />
          <TextInput
            placeholder="URL"
            type="text"
            name="link"
            onChange={handleChange}
          />
          <TextInput
            placeholder="Notes"
            type="text"
            name="notes"
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </InlineForm>
      </div>
    );
}

export default ResourceForm