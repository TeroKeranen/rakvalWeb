// import { PriceComponent } from "../components";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { PriceComponent } from "../components";


const About = () => {

    const {t} = useTranslation();

    
    const theme = useSelector(state => state.userState.theme)
    const boxShadowClass = theme === 'dracula' ? 'shadow-boxShadow1' : 'shadow-customWinter'

    return (
        <div className="  mx-auto bg-gradient-to-t from-slate-600">
            <div className="lg:w-5/6 mx-auto">

            {/* Ensimmäinen osio */}
            <div className="p-5 mt-5 rounded-lg">
                <div className="mt-10">
                    <h1 className="text-3xl font-bold ">{t('about-title1')}</h1>
                </div>

                <div className="my-10 text-lg font-semibold lg:w-3/5">
                    <p className="">{t('about-text1')}</p>
                    
                </div>
            </div>
            {/* Toinen osio */}
            <div className=" p-5 mt-5 rounded-lg">

                <div className="mt-10">
                    <h2 className="text-3xl font-bold ">{t('about-title2')}</h2>
                </div>
                <div className="my-10 text-lg font-semibold lg:w-3/5">
                    <p className="">{t('about-text2')}</p>
                </div>

            </div>

            <div className=" p-5 mt-5 rounded-lg">

                <div className="my-10 text-lg font-semibold lg:w-3/5">
                    <p className="">{t('contact')} rakivalafinland@gmail.com</p>
                </div>

            </div>

            {/* Kolmas osio */}
            <div className=" p-5 my-5 flex flex-col lg:flex-row rounded-lg ">

            <section className={`bg-base-200 lg:w-2/5 m-4 py-4 h-96 rounded-lg ${boxShadowClass} `}>

                <div className="border rounded-lg p-9 m-6 hover:bg-sky-700">

                    <h1 className="text-center text-xl">{t('small')}</h1>
                    <h2 className="text-center text-2xl font-semibold">{t('price1')}</h2>
                    <p className="text-center">{t('monthlyFee')}</p>

                </div>

                <div className="flex justify-center py-5">   
                    <p className="text-lg">{t('how')} 3 {t('contst')}</p>
                </div>

            </section>

            <section className={`bg-base-200 lg:w-2/5 m-4 py-4 rounded-lg ${boxShadowClass}`}>

                <div className="border rounded-lg p-9 m-6 hover:bg-sky-700">

                    <h1 className="text-center text-xl">{t('lightweight')}</h1>
                    <h2 className="text-center text-2xl font-semibold">{t('price2')}</h2>
                    <p className="text-center">{t('monthlyFee')}</p>

                </div>

                <div className="flex justify-center py-5">   
                    <p className="text-lg">{t('how')} 8 {t('contst')}</p>
                </div>

            </section>

            <section className={`bg-base-200 lg:w-2/5 m-4 py-4 rounded-lg ${boxShadowClass}`}>

                <div className="border rounded-lg p-9 m-6 hover:bg-sky-700">

                    <h1 className="text-center text-xl">{t('medium')}</h1>
                    <h2 className="text-center text-2xl font-semibold">{t('price3')}</h2>
                    <p className="text-center">{t('monthlyFee')}</p>

                </div>

                <div className="flex justify-center py-5">   
                    <p className="text-lg text-center">{t('fullorder')}</p>
                </div>

            </section>
            {/* <PriceComponent price="12" type="pieni" worksiteAmount="10"/> */}
               
            </div>
            </div>
        </div>
    )
}

export default About;