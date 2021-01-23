import React, {useState, useEffect} from 'react'
import { __GetResources, __DeleteResource } from '../services/ResourceService'
import ResourceForm from '../components/ResourceForm'

const Resources = (props) => {
const { account } = props
const [resources, setResources] = useState([])

const getResources = async () => {
  let userResources = await __GetResources(account.id)
  setResources(userResources)
}

const addResource = (resource) => {
  // let moreResources = [...resources, resource]
  // setResources(moreResources)
  setResources([...resources, resource])
  getResources()
}

useEffect(()=> {
  getResources()
},[])

const removeResource = async (resource) => {
  let id = resource.id;
  const newResources = await __DeleteResource(id);
  setResources(newResources);
  getResources();
};

console.log(resources)
return (
  <div>
    <header className="head">
      <h1>Resources</h1>
    </header>
    <div className="upload-container">
      {resources.length ? (
        resources.map((resource, index) => (
          <div key={index} className="card mini">
            <ul>
              <a href={resource.link}>{resource.title}</a>
              <button onClick={() => removeResource(resource)}>Delete</button>
            </ul>
          </div>
        ))
      ) : (
        <div className="main">
          <span>Add Some Favorite Sites</span>
        </div>
      )}
    </div>
    <div>
      <ResourceForm account={account} addResource={addResource} />
    </div>
  </div>
);

}

export default Resources