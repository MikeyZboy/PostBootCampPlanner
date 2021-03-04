import React, { useState, useEffect } from "react";
import {
  __GetResources,
  __DeleteResource,
  __CreateResource,
} from "../services/ResourceService";
import ResourceForm from "../components/ResourceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
  background-color: transparent;
`;

const ResourceFormHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-top: 1em;
  margin: 0 auto;
  margin-top: 2em;
  height: auto;
  width: 40%;
  text-align: center;
  color: white;
  font-size: large;
  border: 3px solid grey;
  border-radius: 15px;
  align-items: center;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #194d44;
`;

const TopFormHolder = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  grid-column: 1 / 5;
  grid-row: 1;
  margin: 0 auto;
  height: 25%;
  width: 75%;
  text-align: center;
  color: white;
  font-size: large;
  border: 3px solid grey;
  border-radius: 15px;
  align-items: center;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #194d44;
  overflow-y: hidden;
  &:hover {
    height: 75%;
    overflow-y: visible;
  }
`;

const LinkArea = styled.ul`
  list-style: none;
  grid-column: 1 / 5;
  grid-row: 2;
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  height: auto;
`;

const Link = styled.li`
  display: inline;
  list-style: none;
  padding: 10px;
  max-width: 45%;
  border: 3px solid grey;
  border-radius: 15px;
  background-color: #194d44;
`;

const Favicon = styled.img`
  display: inline;
  position: relative;
  margin-top: 5px;
  margin-right: 10px;
  height: 24px;
  width: 24px;
`;

const Resource = styled.a`
  padding: 20px;
  margin: 0 auto;
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  display: inline-block;
  border: transparent;
  background-color: transparent;
  color: white;
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

  return (
    <div>
      <header className="head">
        <h1>Resources</h1>
      </header>
      {!resources.length ? (
        <ResourceFormHolder>
          <p>Add your first bookmark!</p>
          <ResourceForm account={account} addResource={addResource} />
        </ResourceFormHolder>
      ) : (
        <ResourcesContainer>
          <TopFormHolder>
            <p>Add Bookmarks Below</p>
            <ResourceForm account={account} addResource={addResource} />
          </TopFormHolder>
          <LinkArea>
            {resources.map((resource, index) => (
              <Link key={resource}>
                <Favicon
                  src={`https://icons.duckduckgo.com/ip2/${resource.link}.ico`}
                  alt="favicon link"
                />
                <Resource href={`https://${resource.link}`}>{resource.title}</Resource>
                <Button
                  onClick={() => {
                    removeResource(resource);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes}/>
                </Button>
              </Link>
            ))}
          </LinkArea>
        </ResourcesContainer>
      )}
    </div>
  );
}

export default Resources;
