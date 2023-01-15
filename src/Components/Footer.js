import Link from "next/link";

const Footer = () => {
  return (
    <footer className='footer-container'>
        <div className='footer'>
        <p className='text-sm italic'>Made by <Link href="https://github.com/Tati-Maria">Maria</Link></p>
        </div>
      </footer>
  )
}

export default Footer;