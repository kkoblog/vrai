"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

// セクションヘッダーのコンポーネント化
const SectionHeader = ({ title, subtitle }) => (
  <div className="relative mb-8 md:mb-12 px-4">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-black">
      <span className="relative inline-block pb-4">
        {title}
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]"></span>
      </span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// もしくは別のデザインバージョン
const SectionHeader2 = ({ title, subtitle }) => (
  <div className="relative mb-12 md:mb-16 px-4">
    <h2 className="relative inline-block text-2xl md:text-3xl lg:text-4xl font-bold text-center w-full">
      <span className="relative z-10">{title}</span>
      <span className="absolute left-0 bottom-1 w-full h-3 bg-rose-200/30 -rotate-1 z-0"></span>
    </h2>
    {subtitle && (
      <p className="mt-6 text-sm md:text-base text-gray-600 text-center">
        {subtitle}
      </p>
    )}
  </div>
);

// カラーパレットの定義
const colors = {
  primary: {
    bg: 'bg-[#f8f6f4]',      // ベースの明るいベージュ
    text: 'text-[#4a4a4a]',  // ダークグレー
    accent: 'bg-[#d4c3b7]',  // ライトブラウン
  },
  secondary: {
    light: 'bg-[#fdfbf9]',   // オフホワイト
    border: 'border-[#e8e2dc]', // ライトベージュ
    hover: 'hover:bg-[#f3efe9]', // ホバー時のベージュ
  }
};

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 各セクションのIntersectionObserverを設定
  const [conceptRef, conceptInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [staffRef, staffInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [requirementsRef, requirementsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [qaRef, qaInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });
  const [ownerRef, ownerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });

  // スクロール位置を監視して、ボタンの表示/非表示を制御
  useEffect(() => {
    const handleScroll = () => {
      // 100px以上スクロールしたらボタンを表示
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // トップへスクロール
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // 悩みセクションの各項目用のIntersectionObserver
  const concerns = [
    "美容師として新しいスタート",
    "子育てをしながら仕事を探す",
    "低単価サロンなら簡単だと思い入社",
    "教育時間は営業時間外、即戦力として求められる",
    "自信がないまま、1人で5〜7名をこなさなければならない",
    "子供が熱を出したが、お客様の予約優先で休めず、子供の病気より予約を優先しないといけない",
    "私は「お客様をこなすだけの駒なのか」と思ってしまい心身ともに疲弊する",
    "退職を考えるも、次の就職先でも同じかと自己解決して結局辞められない"
  ];

  const concernRefs = concerns.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  }));

  // 各セクションのIntersectionObserver設定
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  });

  // アニメーション用の共通クラス定義
  const fadeInUpClass = 'transition-all duration-1000 ease-out';
  const fadeInUpAnimation = (inView) => 
    `${fadeInUpClass} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;

  const RequirementSection = () => {
    const requirements = [
      {
        main: "仕事と家庭を両立したい方",
        sub: "家庭が一番なので、仕事よりも家族を優先にしたい方"
      },
      {
        main: "無理なく生涯現役で美容師を続けたい方",
        sub: "1日3名までの丁寧な施術で、疲弊することなく働きたい方"
      },
      {
        main: "現場以外のキャリアも積んでいきたい方",
        sub: "商品開発や企画広報などに挑戦したい方"
      },
      {
        main: "残業ゼロ・ゆとりある予約・数字を追わない仕事をしていきたい方",
        sub: "心に余裕を持って働きたい方"
      },
      {
        main: "社会貢献や地域のイベントなどを、楽しんでやってみたい方",
        sub: "美容師以外のことにもやりがりを持っていきたい方"
      }
    ];

    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.2,
      rootMargin: '-50px'
    });

    return (
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="求める人材"
          subtitle="私たちと一緒に働きませんか？"
        />
        
        <div className="max-w-4xl mx-auto px-4">
          <div 
            ref={ref}
            className={`space-y-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {requirements.map((req, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-[#D3B58D]/20 rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-base md:text-lg font-bold text-black">
                      {req.main}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {req.sub}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row gap-4 justify-center mt-12">
            <button className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8">
              応募する
            </button>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8">
              公式LINE
            </button>
          </div>
        </div>
      </section>
    );
  };

  // 悩みセクション用のIntersectionObserver設定を調整
  const { ref: concernsRef, inView: concernsInView } = useInView({
    triggerOnce: true,
    threshold: 0.05, // より早くトリガーされるように閾値を下げる
    rootMargin: '-10px' // マージンを小さくしてより早くトリガー
  });

  return (
    <div className="font-noto-sans relative">
      {/* ハンバーガーメニューボタン */}
      <button 
        className="fixed top-4 right-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </button>

      {/* ナビゲーションメニュー */}
      <nav className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        <div className="pt-16 px-4">
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => scrollToSection('concept')}
                className="w-full text-left py-2 hover:text-gray-600"
              >
                コンセプト
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('staff-message')}
                className="w-full text-left py-2 hover:text-gray-600"
              >
                スタッフの声
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('requirements')}
                className="w-full text-left py-2 hover:text-gray-600"
              >
                求める人材
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('qa')}
                className="w-full text-left py-2 hover:text-gray-600"
              >
                Q&A
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('owner')}
                className="w-full text-left py-2 hover:text-gray-600"
              >
                オーナー挨拶
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* オーバーレイ */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <header className="bg-[#fafafa] py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl mb-6">michill ミチル</h1>
        
          <Image
            src="/michill.jpg"
            alt="明るく清潔感のあるサロン内装"
            width={1200}
            height={400}
            className="w-full h-[250px] md:h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </header>

      <section className="py-16 md:py-24 mt-16 md:mt-24">
        <SectionHeader 
          title="ママ美容師さんが抱える悩み"
          subtitle="現場で直面する課題
          "
        />
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-lg mb-8">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex flex-col items-center gap-4 md:gap-2">
                {concerns.map((concern, index) => {
                  const { ref, inView } = useInView({
                    triggerOnce: true,
                    threshold: 0.2,
                    rootMargin: '-10px'
                  });

                  return (
                    <React.Fragment key={index}>
                      <div 
                        ref={ref}
                        className={`border-2 border-gray-300 rounded-lg p-4 w-full max-w-md text-center bg-white shadow-sm transition-all duration-500 text-sm md:text-base leading-relaxed ${
                          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                      >
                        {concern}
                      </div>
                      
                      {index < concerns.length - 1 && (
                        <div className={`text-gray-500 text-xl md:text-2xl transition-all duration-500 my-1 md:my-0 ${
                          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl font-bold text-center mb-6">
            <span className="text-[#D3B58D]">michill ミチル</span>
            <br className="md:hidden" />
          </h3>

          <div className="text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto space-y-6">
            <p className="font-bold">
              ではそんなママ美容師さんが抱える悩みを
              <br className="hidden sm:block" />
              全て解決するサロンです
            </p>

            <div className="bg-white/60 rounded-lg p-4 shadow-sm">
              私たちは、白髪老化ケア特化の
              <br className="sm:hidden" />
              高単価メニューを
              <br className="hidden sm:block" />
              提供することで
              <br className="sm:hidden" />
              1日3名のゆとりある予約体制を
              <br className="sm:hidden" />
              とっています。
            </div>

            <div className="bg-white/60 rounded-lg p-4 shadow-sm">
              また、お子様が熱を出したら、
              <br className="hidden sm:block" />
              あなたに変わりしっかり周りが対策します。
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="michillで働くことで得られること"
          subtitle="あなたらしい働き方"
        />
        <div className="max-w-4xl mx-auto">
          <div 
            ref={contentRef}
            className={`grid gap-6 md:gap-8 mb-8 ${fadeInUpAnimation(contentInView)}`}
          >
            <div 
              className={`bg-white p-8 rounded-lg shadow ${fadeInUpClass}`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                新しい技術・スキルを営業内に学ぶことができます
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <Image
                  src="/image/bi.png"
                  alt="スタッフの様子"
                  width={400}
                  height={300}
                  className="w-full md:w-[400px] h-[200px] md:h-[300px] rounded-lg object-cover"
                />
                <p className="text-base md:text-lg leading-relaxed">
                  面接前に、あなたが学びたい技術・スキルをお聞きします。それらは全て営業時間内で学び、身につけることができます
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow ${fadeInUpClass}`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                現場以外のキャリアを叶えることができます
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <Image
                  src="/image/bi.png"
                  alt="メニューの特徴"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <p className="text-lg leading-relaxed">
                  子会社の美容商材メーカーをやっているので、商品開発・企画広報に携わることができます
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow ${fadeInUpClass}`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                特化メニューの提供
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                <Image
                  src="/image/bi.png"
                  alt="お店のこだわり"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
                <p className="text-lg leading-relaxed">
                  白髪老化ケアに特化したメニューを提供しているので、白髪や老化ケアについて深く学ぶことができます
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-4 justify-center mt-12">
            <button className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8">
              応募する
            </button>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8">
              公式LINE
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <SectionHeader 
          title="ママ美容師が抱える悩みNo.1"
          subtitle="子供が熱を出した時の話"
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-[#f5f5f5] p-4 md:p-8 rounded-xl shadow-sm">
              <div className="bg-white/80 p-6 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <i className="fas fa-quote-left text-[#D3B58D] text-xl"></i>
                  <span className="text-[#D3B58D] font-medium">スタッフの声</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-white shadow-md mr-4">
                    <Image
                      src="/image/kko.jpeg"
                      alt="スタッフ1"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-lg">あおい</p>
                    <p className="text-sm text-gray-600">入社4年目 / スタイリスト</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    4歳の子供がいるため、急な休みを取ることも。
                  </p>
                  
                  <p className="text-gray-700">
                    でも<span className="font-bold text-[#D3B58D]">michillでは</span>、
                    <span className="bg-[#D3B58D]/10 px-2 py-1 rounded">
                      スタッフが快く対応してくれ、お客様への連絡も代わりにしてくれます。
                    </span>
                  </p>
                  
                  <p className="text-gray-700">
                    お客様も子育て経験者が多く理解があるので、
                    <span className="border-b-2 border-[#D3B58D]">
                      ママでも安心して美容師を続けられています！
                    </span>
                  </p>
                </div>
                
                <div className="mt-6">
                  <iframe 
                    src="https://www.instagram.com/reel/C_7jiphvJ4I/embed" 
                    className="w-full aspect-[9/16] max-w-[350px] mx-auto"
                    frameBorder="0" 
                    scrolling="no" 
                    allowtransparency="true"
                  ></iframe>
                </div>
                
                <div className="mt-4 text-center">
                  <a 
                    href="https://www.instagram.com/reel/C_7jiphvJ4I/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#D3B58D]/10 text-[#D3B58D] rounded-full hover:bg-[#D3B58D]/20 transition-colors duration-300"
                  >
                    <i className="fab fa-instagram text-lg"></i>
                    <span>Instagramで見る</span>
                  </a>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      <RequirementSection />

      <section className="py-16 md:py-24" id="qa" ref={qaRef}>
        <SectionHeader 
          title="よくあるご質問"
          subtitle="Q&A"
        />
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {[
              {
                question: "技術に不安があっても大丈夫ですか？",
                answer: "研修期間中は、営業時間内の６割がトレーニングです。オリジナルのアプリがありますのでそれを見てご自身の空いている時間に勉強ができます。"
              },
              {
                question: "お客様の年齢層は？",
                answer: "30〜60代の女性のみです。白髪染めやヘアケアに関心の高いお客様が中心です。"
              },
              {
                question: "採用までの流れはどんな感じですか？",
                answer: "まずzoomでオンライン面談をします。その後、サロン見学＆メニューの体験をしてご希望があれば面接をします。"
              },
              
            ].map((qa, index) => (
              <details 
                key={index} 
                className={`bg-white p-6 rounded-lg shadow-sm group transition-all duration-500 ease-out hover:shadow-md ${
                  qaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <summary className="text-lg md:text-xl font-medium cursor-pointer list-none flex justify-between items-center text-gray-800">
                  <span className="flex items-center gap-3">
                    <span className="text-[#D3B58D]">Q.</span>
                    {qa.question}
                  </span>
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-[#D3B58D]">
                    ▼
                  </span>
                </summary>
                <div className="mt-4 pl-6 text-gray-600 leading-relaxed">
                  <span className="text-[#D3B58D] font-medium">A.</span>
                  <span className="ml-2">{qa.answer}</span>
                </div>
              </details>
            ))}
          </div>
          
          <div className="flex flex-row gap-4 justify-center mt-12">
            <button className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8">
              応募する
            </button>
            <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8">
              公式LINE
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="オーナー挨拶"
          subtitle="Message from Owner"
        />
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white shadow-md">
                <Image
                  src="/image/kko.jpeg"
                  alt="オーナーの写真"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <p className="text-lg leading-relaxed">
                家族やプライベートと仕事の時間を大切にした働き方をして貰いたい

・ママさん、カムバックする美容師さんがお客様に無理なく仕事をして貰いたい

​・お客様と向き合った仕事、思いやりのある仲間と一緒に働いて貰いたい

​・美容師が好きで無理なく続けていきたい、思いやりのある環境で仕事がしたい
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4">SNS</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/michill_hair/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl hover:text-[#4a90e2]"
                >
                  <i className="fab fa-instagram"></i>
                  <span className="text-sm ml-2">サロン公式</span>
                </a>
                <a 
                  href="https://www.instagram.com/rony_19795/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-2xl hover:text-[#4a90e2]"
                >
                  <i className="fab fa-instagram"></i>
                  <span className="text-sm ml-2">オーナー</span>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <p>住所：〒465-0093 愛知県名古屋市名東区一社２丁目１４ エポック一社 1F</p>
              <p>電話：052-784-9311</p>
              <p>営業時間：9:30-18:00（土曜日は19:00まで）</p>
              <p>定休日：日曜日</p>
              <div className="mt-4 w-full h-[200px] md:h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8601563414394!2d136.99768791744386!3d35.16786399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600365fabaac0805%3A0x49f414bdf1d872b!2z44Of44OB44Or!5e0!3m2!1sja!2sjp!4v1711603847736!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
        </div>
      </footer>

      {/* トップへ戻るボタン */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 z-40 bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-600 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="トップへ戻る"
      >
        <svg 
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}

// スタイリングの追加
const styles = {
  sectionTitle: `
    relative
    inline-block
    text-2xl md:text-3xl lg:text-4xl
    font-bold
    text-center
    pb-2
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-1/2
    after:transform
    after:-translate-x-1/2
    after:w-12
    after:h-1
    after:bg-rose-400
  `,
};

export default MainComponent;