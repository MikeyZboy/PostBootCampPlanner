import React, { useState, useEffect } from "react";
import { __GetResources, __DeleteResource } from "../services/ResourceService";
import ResourceForm from "../components/ResourceForm";
import styled from "styled-components";

const ResourceContainer = styled.div`
  display: inline-block;
  position: relative;
  mid-width: 120px;
  width: 180px;
  height: 240px;
  scrollable: true;
  margin: 0 auto;
  cursor: pointer;
  color: darkgrey;
  &:hover {
    box-shadow: 3px 4px 10px rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ResourceCard = styled.div``;

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
      <ResourceCardContainer>
        <div className="upload-container">
          {resources.length === 0 ? (
            <div>
              <h2>Add Your Favorite Sites</h2>
              <ResourceForm account={account} addResource={addResource} />
            </div>
          ) : (
            <div>
              <form>
                <input
                  className="goal-input"
                  type="text"
                  name="category"
                  value={categoryValue}
                  placeholder="Category"
                  onChange={handleChange}
                />
              </form>
              {resources.map((resource, index) => {
                resource.category === categoryValue ? (
                  <ul key={index}>
                    <a href={`https://${resource.link}`}>
                      <img
                        class="favicon"
                        src={`https://icons.duckduckgo.com/ip2/${resource.link}.ico`}
                      />
                      {resource.title}
                    </a>
                    <button onClick={() => removeResource(resource)}>
                      REMOVE
                    </button>
                  </ul>
                ) : (
                  <div>
                    <p>Uncategorized</p>
                    <ul> </ul>
                    <ResourceForm />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ResourceCardContainer>
    </div>
  );
};
              {/* {resources.length ? (
                resources.map((resource, index) => (
                  <div key={index} className="card mini">
                    <ul>
                      <p>{resource.topic}</p>
                      <a href={`https://${resource.link}`}>
                        <img
                          class="favicon"
                          src={`https://icons.duckduckgo.com/ip2/${resource.link}.ico`}
                        />
                        {resource.title}
                      </a>
                      <button onClick={() => removeResource(resource)}>
                        REMOVE
                      </button>
                    </ul>
                    <ResourceForm account={account} addResource={addResource} /> */}
        //           </div>
        //         ))
        //       ) : (
        //         <div>There's room for more...</div>
        //       )}
        //     </div>
        //   )}
        // </div>
//                   }
//                   </div>
//       </ResourceCardContainer>
//     </div>
//   );
// };

export default Resources;
