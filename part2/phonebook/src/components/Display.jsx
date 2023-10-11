const Display = (props) => {
    return (
        <>
        {props.directory.map(entry => {
            let tmp_name = entry.name.toLowerCase().trim()            
            if(props.fname.length === 0 || tmp_name.includes(props.fname.toLowerCase().trim()))
            return (
                <>
                <p key={entry.id}>
                    {entry.name} {entry.number}
                    <button onClick={() => props.removeEntry(entry.id)}>Delete</button>
                </p>
                </>
            )
        }
        )}
        </>
    )
}

export default Display