import heroImage from '../assets/kuva.jpg'
import worksiteImage from '../assets/worksiteImg.jpg'
import mobile from '../assets/app.jpg'
import './LoggedOutLanding.css'

const LoggedOutLanding = () => {

    return (
        <div className=''>

            <div className="hero h-96" style={{backgroundImage: `url(${heroImage})`}}>
                <div className="hero-overlay bg-opacity-30"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Tervetuloa</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                    
            </div>

            {/* <div className='text-section h-48 ' style={{backgroundColor: "rgb(40,42,54)"}}> */}

                

                <div className="flex md:flex-row flex-col md:w-11/12 mx-auto mt-5">
                    <div className="md:w-3/4 w-full flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className='w-3/4 mt-10'>
                            <h1 className='text-4xl font-bold mb-5'>Rakival</h1>

                            <p>Tervetuloa alustallemme, joka on suunniteltu tehokkaaseen ja vaivattomaan rakennustyömaiden hallintaan ja seurantaan. Voit hyödyntää teknologian voimaa ja tehostaa rakennushallinnon tehtäviäsi useilla tavoilla</p>
                        </div>
                    </div>
                    <div className="divider divider-horizontal"></div>

                    <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">    
                        <div className="card w-4/5 bg-base-100 shadow-xl mt-5 ">
                            <figure className=''><img src={worksiteImage} alt="Shoes" className='rounded-lg'/></figure>
                                
                        </div>

                    </div>
                </div>

                <div className='my-5'>
                    <div className='w-11/12 mx-auto bg-base-200'>

                        <h1 className='p-3 mb-10 text-4xl font-bold'>Miten voit hyödyntää Rakival alustaa </h1>

                        <div className='flex md:flex-row flex-col justify-between'>
                            <div className='md:w-4/12 p-4'>
                                <h2 className='text-xl font-medium p-2'>Luo Oma Yrityksesi</h2>
                                <p>Perusta oma yritysprofiilisi, jonka kautta voit hallita kaikkia rakennusprojektejasi yhdestä keskitetystä paikasta.</p>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className='md:w-4/12 p-4'>
                                <h2 className='text-xl font-medium p-2'>Lisää Työmaita</h2>
                                <p>Lisää helposti uusia työmaita yrityksesi profiiliin. Järjestele ja valvo kaikkia sivustoja varmistaen, että kaikki tarvittavat tiedot ovat helposti saatavillasi.</p>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className='md:w-4/12 p-4'>
                                <h2 className='text-xl font-medium p-2'>Lisää Työntekijöitä</h2>
                                <p> Laajenna tiimiäsi lisäämällä uusia työntekijöitä yritykseesi. Jokainen jäsen voi käyttää niitä sivustoja, joihin heidät on määrätty, mikä edistää parempaa koordinointia ja viestintää.</p>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className='md:w-4/12 p-4'>
                                <h2 className='text-xl font-medium p-2'>Työmaiden Seuranta</h2>
                                <p>Alustamme tarjoaa työkaluja reaaliaikaiseen työmaiden hallintaan ja seurantaan, mikä helpottaa edistymisen seurantaa, tehtävien hallintaa ja varmistaa, että kaikki sujuu suunnitelmien mukaan.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-row justify-around card bg-base-300 rounded-box">

                    <div className="rounded-box">    
                        <div className="w-4/5 bg-base-100 shadow-xl my-5 mx-auto">
                            <figure className=''><img src={mobile} alt="Shoes" className='rounded-lg' style={{width: "500px", height:"500px"}}/></figure>
                                
                        </div>

                    </div>

                    <div className='w-3/5 mt-10'>
                        <div className='bg-base-100 rounded-box p-10'>

                        <h1>Käytä mobiilisovellusta </h1>
                        <p>Käytössäsi on myös mobiilisovellus, jolla työntekijät voivat työskennellä helposti työmailla, lisäillä kuvia, sekä nauhoittaa työt</p>
                        </div>
                    </div>
                    
                    
                </div>

                {/* </div> */}

        </div>
    )

}


export default LoggedOutLanding;