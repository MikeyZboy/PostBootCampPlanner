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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0 auto;
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
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
  grid-column: 1 / 5;
  grid-row: 1;
  margin: 0 auto;
  height: 10%;
  width: 75%;
  // text-align: center;
  color: white;
  font-size: large;
  border: 3px solid grey;
  border-radius: 15px;
  // align-items: center;
  // box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2);
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
  margin-top: 0;
`;

const Link = styled.li`
  display: inline;
  list-style: none;
  padding: 10px;
  margin: 10px;
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
  font-weight: bold;
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
  const [ isShown, setIsShown ] = useState(false)

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
                <Resource
                  href={`https://${resource.link}`}
                  onMouseEnter={() => setIsShown(true)}
                  onMouseLeave={() => setIsShown(false)}
                >
                  {resource.title}
                </Resource>
                <Button
                  onClick={() => {
                    removeResource(resource);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
                {isShown && <div>{resource.notes}</div>}
              </Link>
            ))}
          </LinkArea>
        </ResourcesContainer>
      )}
    </div>
  );
}

export default Resources;
