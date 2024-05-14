import { useSelector } from "react-redux";
import { PriceComponent } from "../components";

const Pricing = () => {

    
    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-boxShadow1' : 'shadow-customWinter'

    return (
        <div className="  mx-auto bg-gradient-to-t from-slate-600">
            <div className="w-5/6 mx-auto">
            {/* Ensimmäinen osio */}
            <div className=" p-5 mt-5 rounded-lg">
                <div className="mt-10">
                    <h1 className="text-3xl font-bold">Aloita maksutta, laajenna mahdollisuuksiasi</h1>
                </div>

                <div className="my-10 text-lg font-semibold w-3/5">
                    <p>Tervetuloa Rakval työnhallintajärjestelmään, joka on suunniteltu helpottamaan projektien hallintaa ja optimoimaan työmaiden tehokkuutta. Käytä sovellustamme ilmaiseksi ja koe, kuinka helppoa ja joustavaa projektinhallinta voi olla. Ilmainen versio antaa sinulle mahdollisuuden luoda ja hallinnoida jopa kolmea työmaata, mikä tarjoaa erinomaisen tilaisuuden tutustua sovelluksemme toiminnallisuuksiin ilman sitoumuksia.</p>
                </div>
            </div>
            {/* Toinen osio */}
            <div className=" p-5 mt-5 rounded-lg">

                <div className="mt-10">
                    <h2 className="text-3xl font-bold">Kun Olet Valmis Kasvamaan, Olemme Täällä Sinua Varten</h2>
                </div>
                <div className="my-10 text-lg font-semibold w-3/5">
                    <p>Kun yrityksesi tarpeet kasvavat, Rakval on valmiina tukemaan kehitystänne. Valitsemalla maksullisen tilauksemme, voit luoda ja hallinnoida rajoittamattoman määrän työmaita, mikä mahdollistaa skaalautuvuuden ja joustavuuden, joita suuremmat projektit vaativat.</p>
                </div>

            </div>

            {/* Kolmas osio */}
            <div className=" p-5 my-5 flex flex-row rounded-lg ">

            <section className={`bg-base-200 w-2/5 m-4 py-4 h-96 rounded-lg ${boxShadowClass} `}>

                <div className="border rounded-lg p-9 m-6 hover:bg-sky-700">

                    <h1 className="text-center text-xl">Pieni</h1>
                    <h2 className="text-center text-2xl font-semibold">0$</h2>
                    <p className="text-center">kuukausittais</p>

                </div>

                <div className="flex justify-center py-5">   
                    <p className="text-lg">3 työmaata</p>
                </div>

            </section>

            <section className={`bg-base-200 w-2/5 m-4 py-4 rounded-lg ${boxShadowClass}`}>

                <div className="border rounded-lg p-9 m-6 hover:bg-sky-700">

                    <h1 className="text-center text-xl">kevyt</h1>
                    <h2 className="text-center text-2xl font-semibold">16,90$</h2>
                    <p className="text-center">kuukausittais</p>

                </div>

                <div className="flex justify-center py-5">   
                    <p className="text-lg">8 työmaata</p>
                </div>

            </section>

            <section className={`bg-base-200 w-2/5 m-4 py-4 rounded-lg ${boxShadowClass}`}>

                <div className="border rounded-lg p-9 m-6 hover:bg-sky-700">

                    <h1 className="text-center text-xl">Pieni</h1>
                    <h2 className="text-center text-2xl font-semibold">29,9$</h2>
                    <p className="text-center">kuukausittais</p>

                </div>

                <div className="flex justify-center py-5">   
                    <p className="text-lg">loputtomasti työmaata</p>
                </div>

            </section>
            <PriceComponent price="12" type="pieni" worksiteAmount="10"/>
            </div>
            </div>
        </div>
    )
}

export default Pricing;