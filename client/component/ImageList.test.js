import React from 'react';
import chai from 'chai';
var expect = chai.expect;
import {mount, shallow} from 'enzyme';

import {ImageList} from './ImageList';


const imgs = [{_id:1, title:'mono', imageURL:'http://i2.asntown.net/ha/Animals/finger-monkey/finger_monkeys_640_04.jpg', likesCount:4, userId:"1"}];
const props = {
        removeImage:()=>{}, 
        likesInc:()=>{}, 
        likesDec:()=>{}, 
        user:{userId:'1'}, 
        images:imgs};
        
function setup1(){
    return shallow(<ImageList {...props} />);
}
function setup2(){
    return mount(<ImageList {...props} />);
}

describe('ImageList', ()=>{
    it('have a MasonryComponent with class name masonry',()=>{
        const element = setup1();
        
        //console.log("masonry classs",element.debug());
        expect(element.find('MasonryComponent').hasClass('masonry')).to.eql(true);
    });
    
    it('render image with class ImageBox',()=>{
        const element = setup1();
        //console.log("ImageBox class",element.debug());
   //     expect(element.find('MasonryComponent').children()[0].hasClass('ImageBox')).toBe(true);

        expect(element.find('Image')).to.have.length(imgs.length);
    });
    
});


//https://github.com/airbnb/enzyme/blob/master/docs/api