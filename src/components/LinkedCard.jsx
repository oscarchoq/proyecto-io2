import { Link } from "react-router-dom"

const LinkedCard = ({ title, url }) => {
  return (
    <BoxWrapper url={url}>
        <h2 className="text-xl font-bold leading-[17px] text-primary-100">{title}</h2>
    </BoxWrapper>
  )
}

const BoxWrapper = ({ children, url }) => {
  return <Link to={url} className="bg-white h-[70px] rounded-lg border-l-4 border-primary-100 flex items-center justify-center px-8 cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300 ease-out my-2 transition-all">{children}</Link>
}

export default LinkedCard