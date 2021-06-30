import '../styles.css';

const Selector = (props) => {
    return (
        <select value={props.value} onChange={props.onChange}
        >
            {
                props.options.map(item => {
                    return <option value={item}>{props.currencies[item]}</option>
                })
            }
        </select>
    )
}

export default Selector;