import logoImage from '../assets/logo-no-background.png'
const LoggedOutLanding = () => {

    return (
        <div className='h-screen' style={{backgroundImage: `url(${logoImage})`, backgroundSize: '50%', backgroundRepeat: 'no-repeat',backgroundPosition: "center", }}>
            loggedout lanmding
        </div>
    )

}


export default LoggedOutLanding;