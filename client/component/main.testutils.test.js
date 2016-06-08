var expect=require('expect');
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

describe('test', ()=>{
    it('should pass', ()=>{
        expect(true).toEqual(true);
    });
});

function setup(saving){
    let props = {
        course : {}, saving: saving, errors:{},
        onSave: ()=>{},
        onChange: ()=>{}
    };
        
    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props}/>);
    let output = renderer.getRenderOutput();
    
    return {props, output, renderer};
}

describe('CourseForm via react test utils', ()=>{
    it('renders form and h1', ()=>{
        const { output }= setup();
        expect(output.type).toBe('form');
        // if only 1 child..return as object.... if more return as array of objects
        let [h1] = output.props.children;
        expect(h1.type).toBe('h1');
    });
    
    it('save button is labeled "save" when not saving', ()=>{
        const {output} = setup(false);
        const submitButton = output.props.children[2];
        expect(submitButton.props.value).toBe('Save');
    });
    
    it('save button is labeled "Saving..." when saving', ()=>{
        const {output} = setup(true);
        const submitButton = output.props.children[2];
        expect(submitButton.props.value).toBe('Saving...');
    });
    
    
});

