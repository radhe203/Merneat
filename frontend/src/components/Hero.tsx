import hero from  "../assets/hero.png"
const Hero = () => {
  return (
    <div>
        <img src={hero} className=" max-h-[600px] w-full object-cover" />
    </div>
  )
}

export default Hero