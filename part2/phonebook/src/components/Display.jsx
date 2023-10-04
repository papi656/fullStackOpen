const Display = (props) => {
    return (
        <>
        {props.directory.map(entry => {
            let tmp_name = entry.name.toLowerCase()
            if(props.fname.length === 0 || tmp_name.includes(props.fname.toLowerCase()))
            return (<p key={entry.id}>{entry.name} {entry.number}</p>)
        }
        )}
        </>
    )
}

export default Display