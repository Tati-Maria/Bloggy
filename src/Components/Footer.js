import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-purple-900 text-white'>
        <div className='mx-6 md:max-w-6xl lg:mx-auto text-center'>
        <p className='text-sm italic'>Made by <Link href="https://github.com/Tati-Maria">Maria</Link></p>
        </div>
      </footer>
  )
}

export default Footer;