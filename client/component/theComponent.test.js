/*
var expect=require('expect');
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';

import theComponent from './theComponent';

describe('Manage blablabla',()=>{
    it('set error msg when trying to save empty title',()=>{
//        const wrapper = mount(<Provider store={store}><theComponent /></Provider>);
        const props ={
            authors:[],
            course: {id:'', title:''},
            actions: {saveCourse:()=>{return Promise.resolve();}}
        };
        const wrapper = mount(<theComponent {...props}/>);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
   //     expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters');
    });
});

*/