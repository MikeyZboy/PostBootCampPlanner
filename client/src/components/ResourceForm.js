import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import { __CreateResource } from '../services/ResourceService'
import styled from 'styled-components'

const InlineForm = styled.form`
  margin: 0 auto;
  padding: 10px;
  display: block;
  background-color: transparent;
  `;

const ResourceForm = (props) => {
 
    const [ title, setTitle ] = useState('')
    const [ topic, setTopic ] = useState('')
    const [ link, setLink ] = useState('')
    const [ accountId, setAccountId ] = useState(props.account.id)

    const handleChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        switch (fieldName) {
          case "title":
            setTitle(fieldValue);
            break;
          case "topic":
            setTopic(fieldValue);
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
            topic: topic,
            account_id: accountId,
        };
        const newResource = await __CreateResource(formState);
        props.addResource(newResource);
        e.target.reset()
        } catch (error) {
          console.log(error)
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
              placeholder="Topic"
              type="text"
              name="topic"
              onChange={handleChange}
            />
            <TextInput
              placeholder="URL"
              type="text"
              name="link"
              onChange={handleChange}
            />
            <button>Add</button>
          </InlineForm>
        </div>
    );
}

export default ResourceForm