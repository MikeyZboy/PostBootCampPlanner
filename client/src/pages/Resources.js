import React, { useState, useEffect } from "react";
import {
  __GetResources,
  __DeleteResource,
  __CreateResource,
} from "../services/ResourceService";
import TextInput from '../components/TextInput';
import ResourceForm from "../components/ResourceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ResourcesContainer = styled.section`
  position: relative;
  height: 100vh;
  width: 75vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  color: grey;
  margin: 0;
  overflow: scroll;
`;

const ResourceCard = styled.div`
  height: 1fr;
  width: 1fr;
  padding: 0.5em, 1em;
  margin: 1em;
  border: 2px solid gray;
  border-radius: 10px;
  background-color: #194d44;
  &:hover {
    transform: rotateX(-180) ease 2s;
    border: 2px solid #194d44;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const ResourceFormHolder = styled.div`
  height: auto;
  width: 40%;
  margin: 0 auto;
  margin-top: 2em;
  padding-top: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
  font-size: large;
  border: 3px solid grey;
  border-radius: 15px;
  position: relative;
  align-items: center;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #194d44;
`;

const Button = styled.button`
  display: inline-block;
  border: transparent;
  background-color: transparent;
  color: white;
  height: 50px;
  width: 50px;
`;

const InlineForm = styled.form`
  margin: 0 auto;
  padding: 10px;
  display: inline-block;
  background-color: transparent;
`;

const Resources = (props) => {
  const { account } = props;
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [link, setLink] = useState("");
  const [accountId, setAccountId] = useState(props.account.id);

    const getResources = async () => {
      let userResources = await __GetResources(account.id);
      setResources(userResources);
    };

    const addResource = (resource) => {
      setResources([...resources, resource]);
      getResources();
    };

    useEffect(() => {
      getResources();
    }, []);


    const removeResource = async (resource) => {
      let id = resource.id;
      const newResources = await __DeleteResource(id);
      setResources(newResources);
      getResources();
    };


  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    switch (fieldName) {
      case "title":
        setTitle(fieldValue);
        break;
      case "topic":
        fieldValue === '' ? 
          setTopic(props.resource.topic)
          :
          setTopic(fieldValue);
        break;
      case "link":
        setLink(fieldValue);
        break;
    }
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit fired;", e.target.value);
    e.preventDefault();
    try {
      let formState = {
        link: link,
        title: title,
        topic: topic,
        account_id: accountId,
      };
      const newResource = await __CreateResource(formState);
      addResource(newResource);
      clearForm()
      // e.target.reset();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

    const submitOnCard = async (e) => {
      e.preventDefault();
      try {
        let formState = {
          link: link,
          title: title,
          topic: e.target.value,
          account_id: accountId,
        };
        const newResource = await __CreateResource(formState);
        addResource(newResource);
        clearForm();
        // e.target.reset();
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

  const clearForm = (e) => {
    try {
      e.target.reset()
  } catch (error) {
    console.log(error)
  }
  }

  // NOT WORKING : logic for determining if all topics match and add value of that
  // const topicValue = (topic) => {
  //   for (let i = 0; i < resources.length; i++) {
  //     resources[i] === topic ? 
  //       setTopic(resources[0].topic) : console.log('You done fucked up')
  //   }
  // }

  return (
    <div>
      <header className="head">
        <h1>Resources</h1>
      </header>
      {!resources.length ? (
        <ResourceFormHolder>
          <p>Add your first bookmark!</p>
          <ResourceForm
            account={account}
            addResource={addResource}
            onSubmit={(e) => handleSubmit(e)}
          />
        </ResourceFormHolder>
      ) : (
      <ResourcesContainer>
        <ResourceFormHolder>
          <p>Add Bookmarks Below</p>
          <ResourceForm
            account={account}
            addResource={addResource}
            onSubmit={(e) => handleSubmit(e)}
          />
        </ResourceFormHolder>
          <ul>
          {resources.map((resource, index) => (
            <ul value={index} href={`https://${resource.link}`}>
              <img
                  class="favicon"
                  src={`https://icons.duckduckgo.com/ip2/${resource.link}.ico`}
                  alt="favicon link"
                />
                {resource.title}
              <button
                onClick={() => {
                  removeResource(resource);
                }}
                >
                Remove
              </button>
            </ul>
          ))}
          </ul>
        </ResourcesContainer>
    )
    }
  </div>
  );
}

export default Resources;
