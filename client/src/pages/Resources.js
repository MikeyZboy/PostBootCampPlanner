import React, { useState, useEffect } from "react";
import { __GetResources, __DeleteResource } from "../services/ResourceService";
import ResourceForm from "../components/ResourceForm";
import styled from "styled-components";

const ResourcesContainer = styled.section`
  position: relative;
  height: 100vh;
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

  return (
    <div>
      <header className="head">
        <h1>Resources</h1>
      </header>
        {resources.length <= 1 ? 
        (
          <div>
            <h2>Add Your Favorite Resources</h2>
            <p>Here, you can create and categorize what you rely on most!</p>
            <ResourceForm account={account} addResource={addResource}/>
          </div>
        ):(
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
