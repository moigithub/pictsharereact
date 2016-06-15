//var expect=require('expect');
import React from 'react';
import chai from 'chai';
var expect = chai.expect;
import thunk from 'redux-thunk';
import nock from 'nock';
import configMockStore from 'redux-mock-store';
var $ = require("jquery");

import * as types from './actionConstants';
import * as actions from './imageActions';

describe('Image actions', ()=>{
  it('should create a ADD_IMAGE action',()=>{
           var image = {title:'test'};
           var action = {type : types.ADD_IMAGE, image: image};
           expect(actions.AddImage(image)).to.eql(action);
   });
});



const middleware = [thunk];
const mockStore = configMockStore(middleware);
describe('async actions',()=>{
    afterEach(()=>{
        nock.cleanAll();
    });
    
    it('should create ADD_IMAGE action type',()=>{
   
        var couchdb = nock('http://0.0.0.0')
                .post('/api/images')
                .reply(200, {
                  _id: '123',
                  title: 'image1',
                  imageURL: '#',
                  likesCount: 0
                 });
                 
        const expectedActions = [{type:types.ADD_IMAGE}];
        
        const store = mockStore({images:[]});
        store.dispatch(actions.AddImageAsync({title:'test'})).then(()=>{
            const act=store.getActions();
            console.log(act);
            expect(act[0].type).to.equal(types.ADD_IMAGE);
            
        });
    });
});