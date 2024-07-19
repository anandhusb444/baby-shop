import React from 'react'

function About() {
  return (
    <div>
      <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
        <p className="text-lg text-gray-600">
          About us
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">United States Favourite Baby Store.</h2>
          
        </div>
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <img
              className="rounded-lg shadow-lg"
              src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/mothercare/banner/318_202310040219_MC_Fun&Play_Banner_890x645_03.09.23_copy.jpg?width=890&height=644&mode=fill&fill=solid&fill-color=FFFFFF"
              alt="About Us"
            />
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Journey</h3>
            <p className="text-gray-600 mb-4">
            Ut viverra sit ullamcorper vitae nunc volutpat quam donec mauris tempus cursus quisque in eget et.
            Non, in a diam fermentum semper cras cras purus odio enim odio quis turpis sed posuere elit neque, 
            proin ornare odio ultrices nisl elit vestibulum, rhoncus consectetur adipiscing venenatis id turpis est convallis nascetur vitae, lectus a, egestas at cursus pellentesque augue urna nibh etiam elit.
            </p>
            <p className="text-gray-600 mb-8">
              Phasellus consectetur dui a dolor fermentum, sit amet volutpat purus dignissim. Integer eget pulvinar leo.
            </p>
            <a
              href="#"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>

    
    </div>
  )
}

export default About
