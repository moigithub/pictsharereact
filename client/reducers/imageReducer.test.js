import React from 'react';
import chai from 'chai';
var expect = chai.expect;
import imageReducer from './imageReducer';

import { ADD_IMAGE,
     REMOVE_IMAGE,
     UPDATE_IMAGE,
     LIKE_INC,
     LIKE_DEC }
     from '../actions/actionConstants';

import * as actions from '../actions/imageActions';

describe('imageReducer',()=>{
    it('ADD_IMAGE reducer',()=>{
        const initialState = [{_id:1, title:'test1', userId:'1',imageURL:'#', likesCount:0}];
        const newImage={_id:2, title:'test2', userId:'1',imageURL:'#', likesCount:0};
        
        const addAction = actions.AddImage(newImage);
        
        const newState = imageReducer(initialState, addAction);
        
        expect(newState.length).to.eql(2);
        expect(newState[0].title).to.equal('test1');
        expect(newState[1].title).to.equal('test2');
    });
    
    it('REMOVE_IMAGE reducer',()=>{
        const initialState = [
            {_id:1, title:'test1', userId:'1',imageURL:'#', likesCount:0},
            {_id:2, title:'test2', userId:'1',imageURL:'#', likesCount:0}
            ];
        const newImage={_id:2, title:'test2', userId:'1',imageURL:'#', likesCount:0};
        
        const addAction = actions.RemoveImage(newImage);
        
        const newState = imageReducer(initialState, addAction);
        
        expect(newState.length).to.eql(1);
        expect(newState[0].title).to.equal('test1');
    });
    
    it('UPDATE_IMAGE reducer',()=>{
        const initialState = [
            {_id:1, title:'test1', userId:'1',imageURL:'#', likesCount:0},
            {_id:2, title:'test2', userId:'1',imageURL:'#', likesCount:0},
            {_id:3, title:'test3', userId:'1',imageURL:'#', likesCount:0}
            ];
        const newImage={_id:2, title:'test2 updated', userId:'1',imageURL:'#', likesCount:0};
        
        const addAction = actions.UpdateImage(newImage);
        
        const newState = imageReducer(initialState, addAction);
        
        expect(newState.length).to.eql(3);
        expect(newState[0].title).to.equal('test1');
        expect(newState[1].title).to.equal('test2 updated');
        expect(newState[2].title).to.equal('test3');
    });
    
});

