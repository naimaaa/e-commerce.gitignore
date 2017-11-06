import React from 'react';

export default class extends React.Component{
    render(){
        return(
            <form method='post' action='/login'>
                <input type='text' name='username' placeholder='Enter username' />
                <input type='password' name='password' placeholder='Enter password' />
                <button type='submit'>Login</button>
            </form>
        )
    }
}