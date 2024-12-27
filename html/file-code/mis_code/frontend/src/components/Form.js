import React from 'react';

const Form = ({ onSubmit, fields, submitLabel="Submit", children }) => {
    const handleSubmit = (e) => {
       e.preventDefault();
         if (onSubmit) {
           onSubmit(e)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {fields.map(field => (
              <div key={field.name} className='form-group'>
                {field.type === "select" ? (
                    <select
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                         required={field.required}
                    >
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                    </select>
                ) :
                    <input
                       type={field.type}
                       placeholder={field.placeholder}
                       value={field.value}
                       onChange={field.onChange}
                        required={field.required}
                    />
                }
                </div>
            ))}
            {children}
            <button type="submit" className='submit-btn'>{submitLabel}</button>
       </form>
    );
}
export default Form;