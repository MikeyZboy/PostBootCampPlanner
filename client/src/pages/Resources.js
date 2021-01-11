import React, {useState, useEffect} from 'react'
import { __GetResources, __DeleteResource } from '../services/ResourceService'
import ResourceForm from '../components/ResourceForm'

const Resources = (props) => {
    console.log('resources props', props)
const { account } = props
const [resources, setResources] = useState([])

const getResources = async () => {
    let userResources = await __GetResources(account.id)
    console.log('getResources',userResources)
    setResources(userResources)
}

const addResource = (resource) => {
    let moreResources = [...resources, resource]
    setResources(moreResources)
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

return (
  <div>
    <header className="head">
      <h1>Resources</h1>
    </header>
    <div className="upload-container">
      {resources.length >= 1 ? (
        resources.map((resource, index) => (
          <div key={index} className="card mini">
            <ul>
              <a href={resource.link}>{resource.title}</a>
              <button onClick={() => removeResource(resource)}>-</button>
            </ul>
          </div>
        ))
      ) : (
        <div className="main">
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