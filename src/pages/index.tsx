// import { Poppins } from 'next/font/google'
// import styles from './index.module.css'
// const poppins = Poppins({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   style: 'italic',
// })

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className={`h-screen `}>
        <nav className="w-full bg-[#1000004d] backdrop-blur-lg text-amber-50 flex items-center justify-between p-7 fixed">
          <div>헤더 로고</div>
          <div className="flex gap-6">
            <div>로그인</div>
            <div>회원가입</div>
          </div>
        </nav>
        <section className="flex items-center justify-center pt-40">
          <header>Global Top 50</header>
        </section>
        <div className="flex items-center justify-between flex-col h-full">
          <section>
            현재 인기 차트 탑 5 카드로 애니메이션{' '}
            <Link href={'/charts'}>차트보러가기</Link>
          </section>
          <section>최신곡 1개 차트 보러가기</section>
          <section>추천음악</section>
          <section>추천 플레이리스트</section>
          <section>footer</section>
        </div>
      </div>
    </>
  )
}
