import heroImage from '../assets/kuva.webp'
import worksiteImage from '../assets/worksiteImg.jpg'
import mobile from '../assets/mobile.png'
import './LoggedOutLanding.css'
import { useTranslation } from 'react-i18next'

const LoggedOutLanding = () => {

    const {t} = useTranslation();

    return (
        <div className=''>

            <div className="hero h-96" style={{backgroundImage: `url(${heroImage})`}}>
                <div className="hero-overlay bg-opacity-30"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Tervetuloa</h1>
                            <p className="mb-5 text-white">Käyttämään helppokäyttöistä hallintatyökalua</p>
                            {/* <button className="btn btn-primary">Get Started</button> */}
                        </div>
                    </div>
                    
            </div>

            {/* <div className='text-section h-48 ' style={{backgroundColor: "rgb(40,42,54)"}}> */}

                

                <div className="flex md:flex-row flex-col md:w-11/12 mx-auto mt-5">
                    <div className="md:w-3/4 w-full flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className='w-3/4 mt-10'>
                            <h1 className='text-4xl font-bold mb-5'>Rakival</h1>

                            <p>{t('landingOne')}</p>
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

                        <h1 className='p-3 mb-10 text-4xl font-bold'>{t('landingTwo')}</h1>

                        <div className='flex md:flex-row flex-col justify-between'>
                            <div className='md:w-4/12 w-full p-4 min-w-0'>
                                <h2 className='text-xl font-medium p-2'>{t('landingTitleOne')}</h2>
                                <p>{t('landingTextOne')}</p>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className='md:w-4/12 w-full p-4 min-w-0'>
                                <h2 className='text-xl font-medium p-2'>{t('landingTitleTwo')}</h2>
                                <p>{t('landingTextTwo')}</p>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className='md:w-4/12 w-full p-4 min-w-0'>
                                <h2 className='text-xl font-medium p-2'>{t('landingTitleThree')}</h2>
                                <p>{t('landingTextThree')}</p>
                            </div>
                            <div className="divider lg:divider-horizontal"></div>
                            <div className='md:w-4/12 w-full p-4 min-w-0'>
                                <h2 className='text-xl font-medium p-2'>{t('landingTitleFour')}</h2>
                                <p>{t('landingTextFour')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-col lg:flex-row lg:justify-around card bg-base-300 rounded-box">

                    <div className="rounded-box">    
                        <div className="lg:w-4/5 bg-base-100 shadow-xl my-5 mx-auto">
                            <figure className=''><img src={mobile} alt="Shoes" className='rounded-lg' style={{width: "500px", height:"500px"}}/></figure>
                                
                        </div>

                    </div>

                    <div className='lg:w-3/5 mt-10'>
                        <div className='bg-base-100 rounded-box p-10'>

                        <h2 className='text-xl font-medium p-2'>{t('landingTitleFive')}</h2>
                        <p className='p-2'>{t('landingTextFive')}</p>
                        </div>
                    </div>
                    
                    
                </div>

                {/* </div> */}

        </div>
    )

}


export default LoggedOutLanding;