import { PriceComponent } from "../components";


const About = () => {
    return (
        <div className=" w-5/6 mx-auto">
            {/* Ensimmäinen osio */}
            <div className="bg-base-200 p-5 mt-5">
                <div className="mt-10">
                    <h1 className="text-3xl font-bold">Aloita maksutta, laajenna mahdollisuuksiasi</h1>
                </div>

                <div className="my-10 text-lg font-semibold">
                    <p>Tervetuloa Rakval työnhallintajärjestelmään, joka on suunniteltu helpottamaan projektien hallintaa ja optimoimaan työmaiden tehokkuutta. Käytä sovellustamme ilmaiseksi ja koe, kuinka helppoa ja joustavaa projektinhallinta voi olla. Ilmainen versio antaa sinulle mahdollisuuden luoda ja hallinnoida jopa kolmea työmaata, mikä tarjoaa erinomaisen tilaisuuden tutustua sovelluksemme toiminnallisuuksiin ilman sitoumuksia.</p>
                </div>
            </div>
            {/* Toinen osio */}
            <div className="bg-base-200 p-5 mt-5">

                <div className="mt-10">
                    <h2 className="text-3xl font-bold">Kun Olet Valmis Kasvamaan, Olemme Täällä Sinua Varten</h2>
                </div>
                <div className="my-10 text-lg font-semibold">
                    <p>Kun yrityksesi tarpeet kasvavat, Rakval on valmiina tukemaan kehitystänne. Valitsemalla maksullisen tilauksemme, voit luoda ja hallinnoida rajoittamattoman määrän työmaita, mikä mahdollistaa skaalautuvuuden ja joustavuuden, joita suuremmat projektit vaativat.</p>
                </div>

            </div>

            {/* Kolmas osio */}
            <div className="bg-base-200 p-5 my-5 flex flex-row">

                {/* <PriceComponent price="0$" type="maksuton" worksiteAmount="3"/>
                <PriceComponent price="16,9$" type="pieni" worksiteAmount="10"/>
                <PriceComponent price="30$" type="täysi" worksiteAmount ="limitless"/> */}

            </div>

        </div>
    )
}

export default About;