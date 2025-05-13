import { Poppins } from 'next/font/google'
import styles from './index.module.css'
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  style: 'italic',
})

export default function Home() {
  return (
    <>
      <header className="w-full">헤더</header>
      <div
        className={`${styles.bgAnimate} h-screen flex justify-center items-center flex-col`}
      >
        <section>
          <h1
            className={`${poppins.className} ${styles.titleAnimate} font-bold text-9xl`}
          >
            Global Top 50
          </h1>
        </section>
        <section>최신곡 정보</section>
      </div>
    </>
  )
}
