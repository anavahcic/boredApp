

const Form = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        props.getUserChoice(e.target.value);
    }

    return(
        <form>
            <label htmlFor="activityPick">Choose category:</label>
            <select 
                name="activityPick" 
                id="activityPick"
                onChange={handleSubmit}
            >
                <option value="education">Education</option>
                <option value="recreational">Recreational</option>
                <option value="social">Social</option>
                <option value="diy">DIY</option>
                <option value="charity">Charity</option>
                <option value="cooking">Cooking</option>
                <option value="relaxation">Relaxation</option>
                <option value="music">Music</option>
                <option value="busywork">Busywork</option>
            </select>
           
        </form>
    )
}

export default Form;