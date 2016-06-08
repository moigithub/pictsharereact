import React from 'react';

const CourseForm = ({course, onSave, saving, onChange, errors}) => {
    return (
        <form>
            <h1>Manage Course</h1>
            <p>test</p>
            <input 
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...':'Save'} 
                onClick={onSave}></input>
        </form>
        );
};
CourseForm.propTypes = {
    saving: React.PropTypes.bool,
    onSave: React.PropTypes.func.isRequired
};


export default CourseForm;