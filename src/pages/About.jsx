

const About = () => {
    return (
        <>
        <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center h-screen">
            <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">We love</h1>
            <div className="stats bg-primary shadow">
                <div className="stat">
                    <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
                        confy
                    </div>
                </div>
            </div>
        </div>
        <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste et possimus repudiandae laudantium repellendus cum nulla, id velit quod minima?
        </p>
        </>
    )
}

export default About;