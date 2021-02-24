import React, { useState, useEffect } from "react";
import { __GetResources, __DeleteResource } from "../services/ResourceService";
import ResourceForm from "../components/ResourceForm";
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
  padding: .5em, 1em;
  margin: 1em;
  border: 2px solid gray;
  border-radius: 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
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

const Resources = (props) => {
  const { account } = props;
  const [resources, setResources] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");

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

  const handleChange = () => {}

  console.log('Resources:', resources)
  return (
    <div>
      <header className="head">
        <h1>Resources</h1>
      </header>
        {!resources.length ? 
        (
          <ResourceFormHolder>
            <p>Add your first bookmark card!</p>
            <ResourceForm account={account} addResource={addResource}/>
          </ResourceFormHolder>
        ) : (
          resources.map((resource, category, index) => 
        (
          <ResourcesContainer>
            <ResourceCard key={index}>
              <h2>{resource.category}</h2> 
              <ul value={index}>
                <a href={`https://${resource.link}`}>
                  <img
                    class="favicon"
                    src={`https://icons.duckduckgo.com/ip2/${resource.link}.ico`}
                    alt="favicon link"
                  />
                  {resource.title}
                </a>
                <button onClick={()=> {removeResource(resource)}}>Delete</button>   
              </ul>
            </ResourceCard>
          </ResourcesContainer>
        ) 
        ))
        }
    </div>
  );
};

export default Resources;
