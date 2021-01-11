import React, {useState, useEffect} from 'react'
import { __GetResources } from '../services/ResourceService'


const Resources = (props) => {
const { account } = props
const [resources, setResources] = useState([])

const getResources = async () => {
    let userResources = await __GetResources(account.id)
    setResources(userResources)
}


useEffect(()=> {
    getResources()
},[])

return (
  <div>
    <header className="head">
      <h1>Lean on these {account.firstName}...</h1>
    </header>
    <li></li>
  </div>
);

}

export default Resources