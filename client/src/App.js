import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

constructor(props)
{
  super(props);
  this.state = {
     notes : [],
     newnote : '',
     editone : -1
  }
 // this.removes = this.removes.bind(this);
}
componentDidMount()
{
  axios.get('/api/notes').then(res =>{
    const notess = res.data;
    this.setState({
      notes : notess,
    })
    console.log("success");
  })
}

handlechange(e)
{
  this.setState({
    newnote : e.target.value,
  })
}

add(){

  let self = this;
  if(this.state.newnote ==='')
  {
    return;
  }
  axios.post('/api/note', {
    note: this.state.newnote,
    isDone: false
  })
  .then(function (response) {
    console.log(response);
    self.setState({
      notes : response.data,
      newnote : ''
    })

  })
  .catch(function (error) {
    console.log(error);
  });




}

removes(index)
{
  let self = this;
  const url = '/api/notes/' + this.state.notes[index]._id;
  axios.delete(url).then((res)=>{
    self.setState({
      notes : res.data,
    })
  })
}
onchecked(index)
{
  let self = this;
  let temp = this.state.notes[index];
  temp.isDone = !temp.isDone;
  const url = '/api/note/' + this.state.notes[index]._id;
  axios.patch(url,temp).then((res) =>{
    console.log("checked");
    self.setState({
      notes : res.data
    })
  })
}
 removechecked()
  {
    
    for(var i in this.state.notes)
    {
      if(this.state.notes[i].isDone)
      {
       
        this.removes(i);
      }
    }
    
    for(var i in this.state.notes)
    {
      
        document.getElementById(i).checked = false;
       
      
    }
  }
  edits(index)
  {
    console.log(index);
    this.setState({
      editone : index
    })
  }

handlechange1(e,index)
{

  let temp = this.state.notes;
  temp[index].note = e.target.value;
  console.log(temp[index].note);
  this.setState({
    notes : temp
  })


}

savechanges(e,index)
{
  let self = this;
  let temp = this.state.notes[index];
  const url = '/api/note/' + this.state.notes[index]._id;
  axios.patch(url,temp).then((res) =>{
    console.log("checked");
    self.setState({
      notes : res.data,
      editone : -1
    })
  })
}

  render() {
    return (
      <div className="container">
        <h1>TODO LIST</h1>
  <br></br>
  

  <br></br>

  <div className="input-group mb-3">
    <input type="text" className="form-control" placeholder="Add note here" id="listitem" value={this.state.newnote} onChange={(e) => this.handlechange(e)}/>
    <div className="input-group-append">
      <button className="btn btn-primary" type="button" onClick={this.add.bind(this)}>Add note</button>
    </div>
  </div>
  <br></br>
  <ul id="list" className="list-group">
  {
    this.state.notes.length ? this.state.notes.map((note,index) =>{

      if(this.state.editone == -1 || this.state.editone!= index)
      {
      return (
        <li key={index} className="list-group-item"><input id ={index} type="checkbox" onChange={this.onchecked.bind(this,index)}/> &nbsp;{note.note} <button onClick={this.removes.bind(this,index)} className="btn btn-danger float-right"><i className="fas fa-trash"></i></button><button onClick={this.edits.bind(this,index)} className="btn btn-danger float-right"><i className="far fa-edit"></i></button></li>
      )
    }
    else{
      return <li key={index} className="list-group-item"><input type= "text" className="form-control" placeholder="Add note here"  value ={this.state.notes[index].note} onChange={(e) => this.handlechange1(e,index)}/><button className="btn btn-danger" type="button" onClick={(e) => this.savechanges(e,index)}>Save changes</button></li>
    }
    }) : ''
  } 
  </ul>
  <br></br>
  <br></br>
  <button className="btn btn-danger" type="button" onClick={this.removechecked.bind(this)}>Delete all checked</button>
  </div>
    );
  }
}

export default App;
