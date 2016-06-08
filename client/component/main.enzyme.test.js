var expect=require('expect');
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';


function setup(saving){
    const props = {
        course : {}, saving: saving, errors:{},
        onSave: ()=>{},
        onChange: ()=>{}
    };

        
    return shallow(<CourseForm {...props}/>);
//    let renderer = TestUtils.createRenderer();
//    renderer.render(<CourseForm {...props}/>);
//    let output = renderer.getRenderOutput();
    
//    return {props, output, renderer};
}

describe('CourseForm via enzyme', ()=>{
    it('renders form and h1', ()=>{
        /*
        const { output }= setup();
        expect(output.type).toBe('form');
        // if only 1 child..return as object.... if more return as array of objects
        let [h1] = output.props.children;
        expect(h1.type).toBe('h1');
        */
        const wrapper = setup(false);
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Manage Course');
    });
    
    it('save button is labeled "save" when not saving', ()=>{
        /*const {output} = setup(false);
        const submitButton = output.props.children[2];
        expect(submitButton.props.value).toBe('Save');
        */
        const wrapper = setup(false);
        expect(wrapper.find('input').props().value).toBe('Save');
    });
    
    it('save button is labeled "Saving..." when saving', ()=>{
/*        const {output} = setup(true);
        const submitButton = output.props.children[2];
        expect(submitButton.props.value).toBe('Saving...');
        */
        const wrapper = setup(true);
        expect(wrapper.find('input').props().value).toBe('Saving...');
    });
    
    
});


