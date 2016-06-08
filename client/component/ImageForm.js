import React, {Component} from 'react';

export default class ImageForm extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    handleSubmit(e){
        e.preventDefault();
        console.log(this.refs)
    }
    
    render(){
        return (
            <div>
                <form onsubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" ref="title" name="title" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Image Link</label>
                        <input type="text" ref="imageurl" name="imageurl" className="form-control"/>
                    </div>
                    <button className="btn btn-Primary">Submit</button>
                </form>
            </div>
        );
    }
}