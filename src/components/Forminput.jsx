

const FormInput = ({label, type, name, defaultValue,step}) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input 
                type={type}
                name={name}
                defaultValue={defaultValue}
                className="input input-bordered"
                step={step}

            />
        </div>
    )
}

export default FormInput;