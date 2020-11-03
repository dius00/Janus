import React, {useEffect, useState} from 'react'
import Nav from 'react-bootstrap/Nav'
import { useAuth } from "../contexts/AuthContext"
import {db} from "../firebase";


export default function NewsFeed() {
  const { currentUser } = useAuth();
  const [uselections, setUselections] = useState({});
  const [health, setHealth] = useState({});
  const [business, setBusiness] = useState({});
  const [tech, setTech] = useState({});
  const [science, setScience] = useState({});
  const [worlds, setWorld] = useState({});

  let tags = {};

  if(localStorage.getItem("Janus-tags")) {
    tags.pref = localStorage.getItem("Janus-tags").split(",");
  }
  else{
    (async() => {
      try{
      tags = await db.collection("userpref").doc(currentUser.email).get();
      } catch(err) { console.log(err) }
    })()
  }

  async function fetchPost (){
    
    if(tags.pref.includes("US Elections")){
      try{
        const news = await((await db.collection("elections").doc()).orderBy("publishedAt","desc").limit(10).get());
        setUselections(news);
        } catch(err) { console.log(err) }    }
    if(tags.pref.includes("Health")){
      try{
        const news = await (db.collection("health").doc().orderBy("publishedAt","desc").limit(10).get());
        setHealth(news);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("Business")){
      try{
        const news = await (db.collection("business").doc().orderBy("publishedAt","desc").limit(10).get());
        setBusiness(news);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("Science")){
      try{
        const news = await (db.collection("science").doc().orderBy("publishedAt","desc").limit(10).get());
        setScience(news);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("Tech")){
      try{
        const news = await (db.collection("tech").doc().orderBy("publishedAt","desc").limit(10).get());
        setTech(news);
        } catch(err) { console.log(err) }
    }
    if(tags.pref.includes("World News")){
      try{
        const news = await (db.collection("world").doc().orderBy("publishedAt","desc").limit(10).get());
        setWorld(news);
        } catch(err) { console.log(err) }
    }
    console.log("here");
  };
  useEffect(() => {
    fetchPost();
  },[])
  // console.log(tags);
  return (<>
  {/* div className="w-100" style={{ maxWidth: "400px" } */}
    <Nav className="w-100 pt-5" fill variant="tabs" defaultActiveKey="0">

      {tags.pref.map((value,index) => { return(
  <Nav.Item>
    <Nav.Link eventKey={`${index}`}>{value}</Nav.Link>
  </Nav.Item>
  )})}
  
  <Nav.Item>
    <Nav.Link eventKey="disabled" disabled>
      Reserved
    </Nav.Link>
  </Nav.Item>
</Nav></>
  )
}
