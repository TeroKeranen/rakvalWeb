

const LandingPageEvents = ({events}) => {

    

    const renderEvents = () => {

        
        return events.map((event, index) => {
            console.log(event)
            const userEmail = event.user && event.user.email ? event.user.email : "Ei sähköpostia";
            return (
                <div className="border my-2 p-2 rounded-lg" key={index}>
                        <p>{event.type}</p>
                        <p>{userEmail}</p>
                        
                    </div>
                )

        })
    }

    return (
        <div>
            {renderEvents()}
        </div>
    )
}

export default LandingPageEvents