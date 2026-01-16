import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
};

export default function NotFound() {
  return (
    <section className='error__area py-10'>
      <div className='justify-content-center items-center'>
        <div className='error__img flex justify-center items-center'>
          <Image
            src='/images/error_img.png'
            alt='404 Error'
            width={980}
            height={501}
            style={{ width: "30%" }}
            priority
            sizes='(max-width: 768px) 100vw, 30vw'
          />
        </div>
        <div className='error__content'>
          <h2 className='title'>OOPS! Nothing Was Found</h2>
          <p>
            Oops! it could be you or us, there is no page here. It might have been <br /> moved or deleted.
          </p>
          <Link href='/' className='btn'>
            Back To Home Page
          </Link>
        </div>
      </div>
    </section>
  );
}
