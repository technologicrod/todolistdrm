import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo, deleteTodo, getTodoById } from '../api/todo';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [viewedTitle, setViewedTitle] = useState('');
    const [viewedDescription, setViewedDescription] = useState('');
    const [viewedStatus, setViewedStatus] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            loadTodos();
        }
    }, []);

    const loadTodos = async () => {
        try {
            const result = await getTodos();
            setTodos(result.data);
        } catch (error) {
            console.error('Error fetching todos', error);
        }
    };

    const handleAdd = async () => {
        const newTodo = { title, description, status };
        try {
            await addTodo(newTodo);
            loadTodos();
            resetForm();
        } catch (error) {
            console.error('Error adding todo', error);
        }
    };

    const handleView = async (id) => {
        try {
            const result = await getTodoById(id);
            setSelectedTodo(result.data);
            setViewedTitle(result.data.title);
            setViewedDescription(result.data.description);
            setViewedStatus(result.data.status);
            setIsEditing(true);
        } catch (error) {
            console.error('Error fetching todo details', error);
        }
    };

    const handleUpdate = async () => {
        const updatedTodo = { 
            title: viewedTitle, 
            description: viewedDescription, 
            status: viewedStatus 
        };
        if (selectedTodo) {
            try {
                await updateTodo(selectedTodo.todoid, updatedTodo);
                loadTodos();
                resetForm();
            } catch (error) {
                console.error('Error updating todo', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            loadTodos();
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };

    const resetForm = () => {
        setSelectedTodo(null);
        setViewedTitle('');
        setViewedDescription('');
        setViewedStatus('');
        setTitle('');
        setDescription('');
        setStatus('');
        setIsEditing(false);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <button onClick={handleBack}>Logout</button>
            <br />
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
            <button onClick={handleAdd}>Add Todo</button>

            <table style={{ border: '1px solid black', padding: '10px', margin: '10px 0', width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todoid}>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{todo.title}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{todo.description}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{todo.status}</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>
                                <button onClick={() => handleView(todo.todoid)}>View</button>
                                <button onClick={() => handleDelete(todo.todoid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && selectedTodo && ( 
                <div>
                    <h3>Edit Todo</h3>
                    <h4>Current Details:</h4>
                    <table style={{ border: '1px solid black', padding: '10px', margin: '10px 0', width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Field</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}><strong>Title</strong></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{viewedTitle}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}><strong>Description</strong></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{viewedDescription}</td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '8px' }}><strong>Status</strong></td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{viewedStatus}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h4>Update Details:</h4>
                    <input 
                        value={viewedTitle} 
                        onChange={(e) => setViewedTitle(e.target.value)} 
                        placeholder="Update Title" 
                    />
                    <input 
                        value={viewedDescription} 
                        onChange={(e) => setViewedDescription(e.target.value)} 
                        placeholder="Update Description" 
                    />
                    <input 
                        value={viewedStatus} 
                        onChange={(e) => setViewedStatus(e.target.value)} 
                        placeholder="Update Status" 
                    />
                    <button onClick={handleUpdate}>Update Todo</button>
                    <button onClick={resetForm}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Todo;
