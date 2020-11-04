import React, {useEffect, useState} from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Toast from 'react-bootstrap/Toast'
import ToastHeader from 'react-bootstrap/ToastHeader'
import { useAuth } from "../contexts/AuthContext"
import {db} from "../firebase";


export default function NewsFeed() {
  
  const { currentUser } = useAuth();

  const [key, setKey] = useState('0');
  const [uselections, setUselections] = useState({});
  const [health, setHealth] = useState({});
  const [business, setBusiness] = useState({});
  const [tech, setTech] = useState({});
  const [science, setScience] = useState({});
  const [world, setWorld] = useState({});
  const [fetched, setFetched] = useState(true);

  const TitleBind = {
    "US Elections": uselections,
    "Health": health,
    "Business": business,
    "Tech": tech,
    "Science": science,
    "World News": world,
  };

  let tags = {};

  if(localStorage.getItem("Janus-tags")) {
    tags.pref = localStorage.getItem("Janus-tags").split(",");
  }
  else{
    (async() => {
      try{
      tags = (await db.collection("userpref").doc(currentUser.email).get()).data();
      } catch(err) { console.log(err) }
    })()
  }

  async function fetchPost (){
    // const test = (await db.collection("userpref").doc(currentUser.email).get()).data();

    if(tags.pref.includes("US Elections")){
      try{
        let news = await db.collection("elections").orderBy("publishedAt","desc").limit(10).get();
        const temp = [];
        news.forEach((data) => temp.push(data.data()));
        console.log(temp)
        setUselections(temp);
        } catch(err) { console.log(err) }    }
    if(tags.pref.includes("Health")){
      try{
        const news = await db.collection("health").orderBy("publishedAt","desc").limit(10).get();
        const temp = [];
        news.forEach((data) => temp.push(data.data()));
        console.log(temp);
        setHealth(temp);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("Business")){
      try{
        const news = await db.collection("business").orderBy("publishedAt","desc").limit(10).get();
        const temp = [];
        news.forEach((data) => temp.push(data.data()));
        console.log(temp);
        setBusiness(temp);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("Science")){
      try{
        const news = await db.collection("science").orderBy("publishedAt","desc").limit(10).get();
        const temp = [];
        news.forEach((data) => temp.push(data.data()));
        console.log(temp);
        setScience(temp);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("Tech")){
      try{
        const news = await db.collection("tech").orderBy("publishedAt","desc").limit(10).get();
        const temp = [];
        news.forEach((data) => temp.push(data.data()));
        console.log(temp);
        setTech(temp);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("World News")){
      try{
        const news = await db.collection("world").orderBy("publishedAt","desc").limit(10).get();
        const temp = [];
        news.forEach((data) => temp.push(data.data()));
        console.log(temp);
        setWorld(temp);
        } catch(err) { console.log(err) }
    }
    
    console.log("here");
  };

  useEffect( () => {
    fetchPost();
    setFetched(true);
  },[]);

  // const handleSelect = (eventKey) => {
  //   console.log(eventKey);
  //   alert(`selected ${eventKey}`)};
  // console.log(tags);
  return (<>
  {/* div className="w-100" style={{ maxWidth: "400px" } */}
    <Tabs className="w-100 pt-5" 
     id="controlled-tab-example"
     activeKey={key}
     onSelect={(k) => setKey(k)}
     defaultActiveKey="0">

      {
      tags.pref.map((value,index) => { return(
  <Tab className = "page" eventKey={String(index)} title={value} >
<div className = "page">
    {/* {console.log(value, TitleBind[value], uselections)} */}
    { fetched ? 
    Array.isArray(TitleBind[value]) ?
    // console.log(value, TitleBind, TitleBind[value])
      TitleBind[value].map((news,index) => { return (
        <div classname="p-5 m-3">
          <Toast className="rounded mr-2">
          <ToastHeader closeButton={false}>
          <strong className="mr-auto">{news.title}   </strong>
          <small>{news.publishedAt}</small>
          </ToastHeader>
          <Toast.Body>{news.description}<br></br>
          <br></br><small><strong>Source: </strong>{news.source.name}</small>
          <br></br><small><strong>FactCheck: </strong>{String(!news.factCheck)}</small>
          </Toast.Body>
          </Toast></div>)}): <br></br>
          : "Loading"}</div>

  </Tab>
  )})}
  
  <Tab eventKey="99">
      FakeNews (dev)
    </Tab>
</Tabs></>
  )
}
