
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiTodoFill } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";

function App() {
  const [isCompleteScreen , setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newtittle, setNewTittle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [compleatedtodos, setCompletedtodos] = useState([]);

  const handleAddTodo= ()=>{
    let newtodoItem={
      title : newtittle, 
      description: newDescription,

    };
    
    let updatedtodoArr = [...allTodos];
    updatedtodoArr.push(newtodoItem);
    setTodos(updatedtodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedtodoArr));
    setNewTittle ('');
    setNewDescription('');  


  };


  const handleDeleteTodo= (index) =>{
    let reducedtodo = [...allTodos];
    reducedtodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedtodo));
    setTodos(reducedtodo);
  };


  const handleComplete = (index) =>{
    const now = new Date();
    var dd = now.getDate();
    var mm = now.getMonth()  +1 ; 
    var yyyy = now.getFullYear();
    var h = now.getHours();
    var m  =now.getMinutes();
     var s = now.getSeconds();
    var finaldate = dd + '-' + mm +'-' + yyyy + ' at ' + h + ':' + m + ':' + s;
    
    let filtereditem = {
      ...allTodos[index],
      completedOn: finaldate,
    };

    let updatedCompletedArr = [...compleatedtodos];
    updatedCompletedArr.push(filtereditem);
    setCompletedtodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('compleatedtodos', JSON.stringify(updatedCompletedArr));

  };


  const handleDeletecompletedTodo = (index)=> {
    let reducedtodo = [...compleatedtodos];
    reducedtodo.splice(index, 1);
    localStorage.setItem('compleatedtodos', JSON.stringify(reducedtodo));
    setCompletedtodos(reducedtodo);
  };
  
  //  useEffect(()=>{
  //   let savedtodo = JSON.parse(localStorage.getItem("todolist"));
  //   if (savedtodo){
  //     setTodos(savedtodo);
  //   }
  //  },[]);
  useEffect (() => {
    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedToDos = JSON.parse (localStorage.getItem ('compleatedtodos'));
    
    if (savedTodos) {
      setTodos (savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedtodos (savedCompletedToDos);
    }
  }, []);


  //  useEffect(() => {
  //   let savedTodoString = localStorage.getItem("todolist");
  //   console.log("Saved Todo String:", savedTodoString);
  
  //   try {
  //     let savedTodo = JSON.parse(savedTodoString);
  //     if (savedTodo) {
  //       setTodos(savedTodo);
  //     }
  //   } catch (error) {
  //     console.error("Error parsing JSON:", error);
      
  //     // Handle the error, e.g., set default values or clear the storage.
  //     // localStorage.removeItem("todolist");
  //   }
  // }, []);


  return (
    <div className="App">
      
      <h1><RiTodoFill  className='todo-icon'/> Mon Agenda <RiTodoFill  className='todo-icon'/></h1>
      <div className='todo-wrapper'>
      <div className='todo-input'>
        
          <div className='todo-input-item'>
            <label>Titre</label>
            <input type='text' value={newtittle}
             onChange={(e)=> setNewTittle(e.target.value)} placeholder='Quel est le titre de la tâche ?' />
          </div>
      
      

            <div className='todo-input-item'>
              <label>Description</label>
              <input type='text' value={newDescription}
               onChange={(e)=> setNewDescription(e.target.value)} placeholder='Quel est le titre de la description ?' />
            </div>

            <div className='todo-input-item'>
        
                  <button type='button' className='primaryBtn' onClick={handleAddTodo}>Ajouter</button>
            </div>
      </div>

      <div className='btn-area'>
        <button className={`secondryBtn ${isCompleteScreen === false && 'active'}`}
         onClick={() => setIsCompleteScreen (false)} >
          Tâche
          </button>


        <button className={`secondryBtn ${isCompleteScreen === true && 'active'}`}
         onClick={() => setIsCompleteScreen (true)} >
          Complété 
          </button>
      </div>


      <div className='todo-list'>
        
        {isCompleteScreen === false && allTodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            
          </div>

            <div>
              <AiOutlineDelete  className='icon'  title='Supprimer?' 
              onClick={() => handleDeleteTodo(index)} 
              />
              
              { <BsCheckLg className='check-icon' title='Complété?' onClick={()=>handleComplete(index)} /> }
            </div>

      
        </div> 
          );
        })}


{isCompleteScreen === true && compleatedtodos.map((item,index)=>{
          return(
            <div className='todo-list-item' key={index}>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small> <IoMdTime /> Complété le: {item.completedOn}</small></p>
          </div>

            <div>
              <AiOutlineDelete  className='icon'  title='Supprimer?' 
              onClick={() => handleDeletecompletedTodo(index)} 
              />
            
            </div>

      
        </div> 
          );
        })}
      
       </div>
       </div>
      </div>
  
  );
}

export default App;
