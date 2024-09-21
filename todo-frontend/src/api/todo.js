import axios from 'axios';

const token = localStorage.getItem('token');

export const getTodos = async () => {
    return await axios.get('http://127.0.0.1:8000/api/todos/', {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
};

export const getTodoById = async (id) => {
    return await axios.get(`http://127.0.0.1:8000/api/todos/${id}/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
};

export const addTodo = async (todo) => {
    return await axios.post('http://127.0.0.1:8000/api/todos/', todo, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
};

export const updateTodo = async (id, todo) => {
    return await axios.put(`http://127.0.0.1:8000/api/todos/${id}/`, todo, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
};

export const deleteTodo = async (id) => {
    return await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, {
        headers: {
            Authorization: `Token ${token}`,
        },
    });
};
