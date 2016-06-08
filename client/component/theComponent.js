import React from 'react';

export default class TheComponent extends React.Component {
    constructor(props,context){
        super(props,context);

    }
    
    render(){
        return (
            <div>
                <input type="submit" value="Submit"/>
            </div>
        );
    }
};
