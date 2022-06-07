const Hero = () => {
    return (
        <div className="hero min-h-[95vh]" style={{backgroundImage: `url(https://api.lorem.space/image/fashion?w=1000&h=800)`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">“Si tienes un cuerpo, eres un atleta”</h1>
                <p className="mb-5">No hay frase más inspiradora en la historia del deporte que la que dijo Bill Bowerman, co-fundador de Nike.</p>
                <a href="#anchor-name"><button className="btn btn-primary">Empecemos!</button></a>
                </div>
            </div>
        </div>
    )
}
export default Hero