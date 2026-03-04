import './CardEdit.css'

function CardEdit() {
    return (
        <article className='card-modifier-wrapper'>
            <form action="https://us-central1-js04-b4877.cloudfunctions.net/tasks">
                <button type='submit' className='add-card'>
                    <h3>Add Card</h3>
                </button>
                <input type="text" maxLength={15}/>
            </form>
        </article>
    )
}

export default CardEdit