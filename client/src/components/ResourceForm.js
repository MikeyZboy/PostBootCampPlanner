import React, { useState } from 'react'
import TextInput from '../components/TextInput'
import { __CreateResource } from '../services/ResourceService'


const ResourceForm = (props) => {
    console.log('resourceForm, props:', props)
    
    const [ title, setTitle ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ link, setLink ] = useState('')
    const [ accountId, setAccountId ] = useState(props.account.id)

    const handleChange = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.fieldValue
        switch (fieldName) {
          case "title":
            setTitle(fieldValue);
            break;
          case "category":
            setCategory(fieldValue);
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
            topic: category,
            account_id: accountId,
        };
        const newResource = await __CreateResource(formState);
        props.addResource(newResource);
        } catch (error) {
        throw error
        }
    };

    return (
      <div className="form-container form-div">
        <form className="inapp-form" onSubmit={handleSubmit}>
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
        </form>
      </div>
    );
}

export default ResourceForm