const Hero = () => {
    return (
        <div className="hero min-h-[95vh] mt-16" style={{backgroundImage: `url(https://api.lorem.space/image/fashion?w=1000&h=800)`}}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                <a href="#anchor-name"><button className="btn btn-primary">Get Started</button></a>
                </div>
            </div>
        </div>
    )
}
export default Hero