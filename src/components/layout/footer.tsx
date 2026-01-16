import Image from "next/image";
import Link from "next/link";

const wLogo = "/logo/w_logo.png";
const footerShape1 = "/images/footer_shape01.png";
const footerShape2 = "/images/footer_shape02.png";
const newsletterShape = "/images/footer_newsletter_shape.svg";

export default async function Footer() {
  return (
    <footer className='max-w-screen'>
      <div className='footer__area'>
        <div className='footer__top footer__top-three fix'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-3 col-lg-4 col-md-6'>
                <div className='footer__widget'>
                  <div className='footer__logo'>
                    <Link href='/'>
                      <Image src={wLogo} alt='Logo' width={149} height={40} />
                    </Link>
                  </div>
                  <div className='footer__content footer__content-two'>
                    <p>
                      Duis aute irure dolor in repreerit in voluptate velitesse We understand that your furry friend
                      tred member
                    </p>
                  </div>
                  <div className='footer__social'>
                    <h6 className='title'>Follow Us On:</h6>
                    <ul className='list-wrap'>
                      <li>
                        <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                          <i className='fab fa-facebook-f'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                          <i className='fab fa-twitter'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.whatsapp.com/' target='_blank' rel='noopener noreferrer'>
                          <i className='fab fa-whatsapp'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                          <i className='fab fa-instagram'></i>
                        </a>
                      </li>
                      <li>
                        <a href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer'>
                          <i className='fab fa-youtube'></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='col-xl-2 col-lg-3 col-md-6 col-sm-6'>
                <div className='footer__widget'>
                  <h4 className='footer__widget-title'>Info</h4>
                  <div className='footer__link'>
                    <ul className='list-wrap'>
                      <li>
                        <Link href='/about'>About us</Link>
                      </li>
                      <li>
                        <Link href='/contact'>Contact us</Link>
                      </li>
                      <li>
                        <Link href='/reservation'>Book Appointment</Link>
                      </li>
                      <li>
                        <Link href='/faq'>FAQ</Link>
                      </li>
                      <li>
                        <Link href='/contact'>Locations</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6'>
                <div className='footer__widget'>
                  <h4 className='footer__widget-title'>Help</h4>
                  <div className='footer__contact'>
                    <ul className='list-wrap'>
                      <li>555 A, East Manster Street, Ready Halley Neon, Uk 4512</li>
                      <li>
                        <a href='tel:0123456789'>+00 123 45678 44</a>
                      </li>
                      <li>
                        <a href='mailto:Supportinfo@gmail.com'>Supportinfo@gmail.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className='col-xl-4 col-lg-4 col-md-6'>
                <div className='footer__widget'>
                  <div className='footer__newsletter'>
                    <h2 className='title'>Fetch 20% off with your lovely pup, plus the latest News.</h2>
                    <div className='shape'>
                      <Image src={newsletterShape} alt='newsletter shape' width={66} height={15} />
                    </div>
                    <form action='#'>
                      <input id='email' type='email' placeholder='Type Your E-mail' />
                      <button className='btn' type='submit'>
                        Subscribe Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='footer__shape-wrap'>
            <Image
              src={footerShape1}
              alt='Footer shape 1'
              data-aos='fade-up-right'
              data-aos-delay='400'
              width={70}
              height={81}
            />
            <Image
              src={footerShape2}
              alt='Footer shape 2'
              data-aos='fade-up-left'
              data-aos-delay='400'
              width={160}
              height={150}
            />
          </div>
        </div>

        <div className='footer__bottom footer__bottom-two'>
          <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-5'>
                <div className='copyright-text copyright-text-three'>
                  <p>Copyright © 2025. All Rights Reserved.</p>
                </div>
              </div>
              <div className='col-lg-7'>
                <div className='footer__bottom-menu footer__bottom-menu-two'>
                  <ul className='list-wrap'>
                    <li>
                      <Link href='/contact'>Support</Link>
                    </li>
                    <li>
                      <Link href='/contact'>Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href='/contact'>Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href='/contact'>Career</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
