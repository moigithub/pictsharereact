var expect=require('expect');
import React from 'react';

import * as types from './actionConstants';
import * as actions from './imageActions';

describe('Image actions', ()=>{
  it('should create a ADD_IMAGE action',()=>{
           var image = {title:'test'};
           var action = {type : types.ADD_IMAGE, image: image};
           expect(actions.AddImage(image)).toEqual(action);
   });
});