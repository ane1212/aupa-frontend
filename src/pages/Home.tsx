
// para links a registro por ejemplo quizás meter el auth aquí al ser landing de router.

import logo from '../assets/logo-trimmed.png'

const Home = () => {
    return (
        <div className="home">
            <img className="logo" src={logo} alt="Logo" />
            <p>Aupa, you!</p>
            <p>Ready to live like basque today?</p>
            <p>Recommended right now</p>
            <p>Local top picks</p>
            <p>Experiences for you</p>
        </div>
    )
}

export default Home;