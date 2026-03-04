import './TaskCard.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import deleteSvg from './../../assets/card-edit/delete.svg'
import checkSvg from './../../assets/card-edit/check.svg'

function TaskCard() {

    const [taskCardData, setTaskCardData] = useState([])

    const cardDataApi = "https://us-central1-js04-b4877.cloudfunctions.net/tasks"

    useEffect(() => {
        axios.get(cardDataApi)
            .then(response => setTaskCardData(response.data.data))
            .catch(error => console.error("failed to fethc data", error))
    }, [])

    console.log(taskCardData);

    return (
        <section className='task-card-wrapper'>
            {taskCardData.map((card) => {
                return (
                    <article key={card.id}>
                        <img src={deleteSvg} alt="delete svg" />
                        <div>
                            <h2>{card.text}</h2>
                            <h3>Date: {card.create_time}</h3>
                        </div>
                        <button className='check-button-container' >
                            <img src={checkSvg} alt="check svg" />
                        </button>  
                    </article>
                )
            })}
        </section>
    )
}

export default TaskCard