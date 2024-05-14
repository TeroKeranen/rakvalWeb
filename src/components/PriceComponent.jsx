

const PriceComponent = ({price, type, worksiteAmount}) => {
    return (
        <section className="border w-2/5 m-4 py-4 rounded-lg">

            <div className="border rounded-lg p-4 m-6">

                <h1 className="text-center text-xl">{type}</h1>
                <h2 className="text-center text-2xl font-semibold">{price}</h2>
                <p className="text-center">kuukausittais</p>

            </div>

            <div className="flex justify-center py-5">   
                <p className="text-lg">{worksiteAmount} työmaata</p>
            </div>

        </section>
    )
}


export default PriceComponent;