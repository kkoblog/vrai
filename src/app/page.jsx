"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

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
      <p className="mt-6 text-sm md:text-lg lg:text-xl text-gray-600 text-center">
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

// Instagramの埋め込みを最適化
const InstagramEmbed = ({ url }) => {
  return (
    <div className="w-full aspect-[9/16] max-w-[280px] mx-auto">
      <iframe 
        src={url}
        className="w-full h-full"
        frameBorder="0" 
        scrolling="no" 
        allowtransparency="true"
      />
    </div>
  );
};

// スタッフカードコンポーネントの作成
const StaffCard = ({ image, name, position, message, instagramUrl }) => {
  return (
    <div className="bg-[#f5f5f5] p-4 md:p-8 rounded-xl shadow-sm">
      <div className="bg-white/80 p-6 rounded-xl shadow-sm h-full flex flex-col">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fas fa-quote-left text-[#D3B58D] text-xl"></i>
          <span className="text-[#D3B58D] font-medium"></span>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full border-4 border-white shadow-md mr-4 flex-shrink-0">
            <Image
              src={image}
              alt={`スタッフ${name}`}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700">
            {message}
          </p>
          
          <p className="text-gray-700">
            でも<span className="font-bold text-[#D3B58D]">michillでは</span>、
            <span className="bg-[#D3B58D]/10 px-2 py-1 rounded inline-block mt-1">
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
        
        <InstagramEmbed url={instagramUrl} />
      </div>
    </div>
  );
};

// スライドショーコンポーネントを追加
const ImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/image/viaigaikan.jpeg",
      alt: "外観の様子"
    },
    {
      src: "/image/vrainaisou2.jpeg",
      alt: "店内の様子"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[1/1] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[1/1] overflow-hidden rounded-lg shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ${
            currentImageIndex === index 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-full'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw,
                   (max-width: 768px) 80vw,
                   (max-width: 1024px) 70vw,
                   60vw"
            className="object-cover object-center"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
      
      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

function MainComponent() {
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
    }
  };

  // 悩みセクションの各項目用のIntersectionObserver
  const concerns = [
    "産後、低単価サロンなら簡単だと思い入社",
    "教育時間は営業時間外で疲弊💦即戦力として求められる💦",
    "自信がないまま、1人で5〜7名をこなさなければならず疲弊💦\n子どもが発熱、予約を代わってもらえず無理やり保育園へ入れる毎日💦",
    "仕事をこなすことに精一杯で駒のように感じる💦",
  ];

  const concernRefs = concerns.map(() => useInView({
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '-50px'
  }));

  // アニメーション用のIntersectionObserver設定を確認
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1, // より早くトリガーされるように閾値を下げる
    rootMargin: '-50px'
  });

  // アニメーションクラスの定義を確認
  const fadeInUpClass = 'transition-all duration-1000 ease-out';
  const fadeInUpAnimation = (inView) => 
    `${fadeInUpClass} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`;

  // 特徴セクション用のIntersectionObserver設定を追加
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const RequirementSection = () => {
    const requirements = [
      {
        main: "特化した技術が欲しい方",
        sub: "ブリーチワークのスペシャリストとして、東京レベルの技術を名古屋で習得できます"
      },
      {
        main: "自分の技術に見合った報酬、成果がほしい",
        sub: "平均単価26,000円、月80万円以上の売上を目指せる環境があります"
      },
      {
        main: "自分の時間と仕事の時間を自分で選べる人生を送りたい方",
        sub: "お客様も30-40代の大人の女性が中心で、クレーム率は年間1件以下と非常に低く、心に余裕を持って働けます。"
      },
      {
        main: "将来の独立をしたい方",
        sub: "オーナー直接指導のもと、技術力と集客力を確実に身につけられます"
      },
      {
        main: "業務委託の環境に不安がある方",
        sub: "「あなた以外は嫌だ」と言ってもらえる固定客を持てる美容師に成長できます"
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

    
        
        <div className="max-w-6xl mx-auto px-4">
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
                  <div className="space-y-2 w-full">
                    <p className="text-base md:text-lg font-bold text-black">
                      {req.main}
                    </p>
                    <p className="text-sm md:text-base text-gray-600">
                      {req.sub}
                    </p>
                    {req.images && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {req.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="space-y-2">
                            <div className="relative aspect-video">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <p className="text-sm text-gray-600 text-center font-medium">
                              {img.caption}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {img.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
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
      <header className="bg-[#fafafa] py-8 md:py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          
          
          <div className="relative">
            <Image
              src="/image/vraigaikan2.jpeg"
              alt="明るく清潔感のあるサロン内装"
              width={1200}
              height={600}
              className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
            
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-white px-4 md:px-8 text-center space-y-8">
                <p className="text-base md:text-2xl font-medium mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards]">
                  ー<br />
                  ー<br />
                  ー
                </p>
                
                <p className="text-base md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 opacity-0 animate-[fadeInUp_1s_ease-out_1.5s_forwards]">
                  ー<br />
                  ー
                </p>
                
                <div className="relative">
                  <p className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-0 blur-sm" id="blurText">
                    <span className="inline-block">vrai</span>
                  </p>
                  <style jsx>{`
                    #blurText {
                      animation: blurReveal 2s ease-out 2s forwards;
                    }
                    
                    @keyframes blurReveal {
                      0% {
                        opacity: 0;
                        filter: blur(10px);
                      }
                      100% {
                        opacity: 1;
                        filter: blur(0);
                      }
                    }
                  `}</style>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </header>

      

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
        <Link 
          href="/contact" 
          className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
        >
          応募する
        </Link>
        <button className="bg-[#06c755] text-white px-6 py-3 rounded-full hover:bg-[#059144] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0">
          代表MASAKIからのメッセージを見る
        </button>
      </div>

      <section className="py-16 md:py-24 mt-8 md:mt-12">
        <SectionHeader 
          title="多くの美容師が抱える悩み事、当サロンでは一切致しません"
          subtitle="現場で美容師を困らせがちな環境や課題"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2 md:gap-8">
            {/* 左側: 一般的な美容室の悩み */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-red-600">＜他店＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "「ブリーチは好き」なのに、髪質改善・白髪染めがメインで夢が遠のいていく💦",
                  "外部講習に通っても、サロンでは実践できずモチベーションが下がる日々💦",
                  "人間関係は良好で給料も安定...でも10年後も同じ技術のままで大丈夫？💦",
                  "東京のサロンに行きたい気持ちはあるけど、今の環境が心地よくて一歩が踏み出せない💦"
                ].map((concern, index) => (
                  <React.Fragment key={index}>
                    <div className="border-2 border-red-200 rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm text-xs md:text-base leading-relaxed">
                      {concern}
                    </div>
                    {index < 3 && (
                      <div className="text-red-400 text-base md:text-2xl">↓</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 右側: vraiの場合 */}
            <div className="p-2 md:p-6 rounded-lg">
              <h3 className="text-base md:text-xl font-bold text-center mb-3 md:mb-6 text-[#D3B58D]">＜vraiなら＞</h3>
              <div className="flex flex-col items-center gap-2 md:gap-4">
                {[
                  "平均26,000円の高単価サロン。ブリーチ率80%以上で「やりたかった技術」が毎日活かせる✨",
                  "営業後にオーナーが直接マンツーマン指導。憧れの技術を確実に身につけられる✨",
                  "最短1年でブリーチワークのスペシャリストへ。東京レベルの技術が名古屋で学べる✨",
                  "独立も視野に入れた確かな技術力と実績。自分の未来を自分で選べる環境✨"
                ].map((solution, index) => (
                  <React.Fragment key={index}>
                    <div className="border-2 border-[#D3B58D] rounded-lg p-2 md:p-4 w-full text-center bg-white shadow-sm text-xs md:text-base leading-relaxed">
                      {solution}
                    </div>
                    {index < 3 && (
                      <div className="text-[#D3B58D] text-base md:text-2xl">↓</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5 rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl font-bold text-center mb-6">
            <span className="text-[#D3B58D]">vraiの特徴</span>
            <br className="md:hidden" />
          </h3>

         
<div className="mt-8 md:mt-12 px-4 max-w-6xl mx-auto">
  <div 
    className={`max-w-lg mx-auto transition-all duration-1000 ${
      featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}
  >
    <ImageSlideshow />
  </div>
</div>

          <br />

          <div 
            ref={featuresRef}
            className="text-base md:text-xl leading-relaxed text-center max-w-3xl mx-auto space-y-6"
          >
            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">①</span>
              バレイヤージュ・ハイライト特化で平均26,000円高単価
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                高度な技術と丁寧な施術で
                <br />
                お客様に高い満足度を提供できます
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">②</span>
              東京でやっている技術が名古屋の金山で学べる
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                最新のトレンドと高度な技術を
                <br />
                地元名古屋で習得することができます
              </span>
            </div>

            <div 
              className={`bg-white rounded-lg p-6 shadow-md border border-[#D3B58D]/20 hover:shadow-lg transition-all duration-700 ${
                featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <span className="text-[#D3B58D] font-bold text-lg">③</span>
              自分の技術を評価してくれるお客様がついてくれる
              <br />
              <br />
              <span className="text-gray-700 text-sm md:text-base">
                技術力を正当に評価され
                <br />
                あなたの担当でないと嫌だと言ってもらえる
                <br />
                そんな信頼関係を築くことができます
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="vraiで働くことで得られる事"
          subtitle="あなたらしい働き方"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div 
            ref={contentRef}
            className="space-y-8"
          >
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                東京に行かなくても業界トップクラスのブリーチテクニックが身につきます
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/tokutyou1.jpeg"
                    alt="ブリーチ"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  当サロンでは、オーナー自らが10年以上かけて培ったブリーチワークの技術を、体系的に学ぶことができます。東京の有名サロンに通わなくても、名古屋で最先端の技術を習得できる環境を整えています<br /><br />
                  実際の施術では、サロンのブリーチ施術率が80%を超えているため、学んだ技術を即座に実践できます。理論だけでなく、実践を通じて確実にスキルアップを図ることができます<br /><br />
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                「あなた以外は嫌だと」お客様に言っていただけます
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/tokutyou2.jpeg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                  お客様から「あなた以外は嫌だ」と言っていただけることで、あなたの技術や接客が正当に評価され、
                  固定客として長期的な信頼関係を築くことができます。これにより、安定した収入が見込め、
                  キャリアの選択肢も広がります
                </p>
              </div>
            </div>

            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className="text-2xl mb-4 font-bold">
                将来の選択が自由にできる美容師になります
              </h3>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                <div className="w-full md:w-[400px] flex-shrink-0">
                  <Image
                    src="/image/tokutyou3.jpeg"
                    alt="スタッフの様子"
                    width={400}
                    height={300}
                    className="w-full h-[400px] md:h-[300px] rounded-lg object-cover"
                  />
                </div>
                <p className="text-base md:text-lg leading-relaxed">
                高度な技術力を身につけることで、
                  業務委託や面貸し、独立開業など、どのような環境でも
                  活躍できる実力が身につきます
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div 
              className={`bg-white p-8 rounded-lg shadow transition-all duration-700 ${
                contentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-2xl mb-6 font-bold text-center">
                <span className="relative inline-block">
                  現場仕事の日のとある1日
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#D3B58D]/30"></span>
                </span>
              </h3>
              
              <div className="max-w-2xl mx-auto">
                <div className="space-y-4">
                  {[
                    { time: "9:00", activity: "出勤" },
                    { time: "9:30", activity: "掃除" },
                    { time: "9:45", activity: "朝礼" },
                    { time: "10:00", activity: "営業開始" },
                    { time: "15:30", activity: "お昼ご飯（随時順番に）" },
                    { time: "20:00", activity: "終礼" },
                    { time: "20:15", activity: "練習、帰宅" },
                  ].map((schedule, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-6 p-4 hover:bg-[#D3B58D]/5 rounded-lg transition-colors duration-300"
                    >
                      <div className="w-24 flex-shrink-0">
                        <span className="font-bold text-[#D3B58D]">{schedule.time}</span>
                      </div>
                      <div className="flex-grow">
                        <span className="text-gray-700">{schedule.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <Link 
              href="/contact" 
              className="bg-[#e24a4a] text-white px-6 py-3 rounded-full hover:bg-[#bd3535] transition duration-300 text-sm sm:text-base sm:px-8 w-fit mx-auto sm:mx-0"
            >
              応募する
            </Link>
            
          </div>
        </div>
      </section>

      

    

<section className="py-16 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
  <SectionHeader 
    title="募集要項"
    subtitle="採用情報"
  />
  <div className="max-w-6xl mx-auto px-4">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {[
        {
          title: "勤務地",
          content: "愛知県名古屋市中区平和１-２２-５ パルティール金山アネックス１F"
        },
        {
          title: "雇用形態",
          content: "正社員"
        },
        {
          title: "職種・給与",
          content: (
            <div className="space-y-8">
              <div>
                <p className="font-medium text-lg border-b-2 border-[#D3B58D] pb-2 mb-4">アシスタント</p>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800">月給 21万円 ~ 25万円</p>
                    <p className="text-sm text-gray-600">※試用期間6ヶ月：月給20万円</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">各種手当</p>
                    <ul className="list-none space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>店販手当</strong>：売上額の10％を支給</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>生産性手当</strong>：生産性に応じて支給（月90万円～/1万円、80万円/6,000円）※スタッフ人数により変動</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>売上手当</strong>：月間売上に応じて支給<br />
                        ・80万円：10%<br />
                        ・100万円：12～15%<br />
                        ・200万円：25～30%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>管理手当</strong>：備品や在庫管理、他スタッフへの指示等に応じて支給（月上限2万円）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>ブログ手当</strong>：サロンサイト・インスタ等の投稿1件につき100円</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>口コミ手当</strong>：1件につき500円（Googleビジネスプロフィール含む）</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-medium text-lg border-b-2 border-[#D3B58D] pb-2 mb-4">スタイリスト</p>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-800">月給 22万円 ~ 100万円</p>
                    <p className="text-sm text-gray-600">例）技術売上80万円の場合：基本給＋生産性手当＋技術手当＋etc＝32万円～</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">キャリアパスと昇給</p>
                    <p className="text-gray-600">フリー入客start → 平均指名50名player → 店長 と段階的に基本給UP</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">各種手当</p>
                    <ul className="list-none space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>店販手当</strong>：売上額の10％を支給</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>生産性手当</strong>：生産性に応じて支給（月90万円～/1万円、80万円/6,000円）※スタッフ人数により変動</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>売上手当</strong>：月間売上に応じて支給<br />
                        ・80万円：10%<br />
                        ・100万円：12～15%<br />
                        ・200万円：25～30%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>管理手当</strong>：備品や在庫管理、他スタッフへの指示等に応じて支給（月上限2万円）</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>ブログ手当</strong>：サロンサイト・インスタ等の投稿1件につき100円</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#D3B58D] mr-2">✓</span>
                        <span><strong>口コミ手当</strong>：1件につき500円（Googleビジネスプロフィール含む）</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        {
          title: "試用期間",
          content: "試用期間あり"
        },
        {
          title: "待遇・福利厚生",
          content: (
            <div className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>社会保険完備（雇用保険・労災保険・健康保険・厚生年金）</li>
                <li>交通費規定支給（上限1万円/月）</li>
              </ul>
              <p className="text-sm text-gray-500">※試用期間あり（技術レベルによる）</p>
            </div>
          )
        }
      ].map((item, index) => (
        <div 
          key={index}
          className={`flex flex-col md:flex-row border-b border-gray-100 ${
            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
          }`}
        >
          <div className="w-full md:w-1/4 p-4 md:p-6 bg-[#D3B58D]/5">
            <h4 className="font-bold text-gray-800">{item.title}</h4>
          </div>
          <div className="w-full md:w-3/4 p-4 md:p-6">
            {typeof item.content === 'string' ? (
              <p className="text-gray-600">{item.content}</p>
            ) : (
              item.content
            )}
          </div>
        </div>
      ))}
    </div>

    
  </div>
</section>



      <RequirementSection />

      <section className="py-16 md:py-24" id="qa" ref={qaRef}>
        <SectionHeader 
          title="よくあるご質問"
          subtitle="Q&A"
        />
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4">
            {[
              {
                question: "ブリーチは好きだけど技術には自信がない。",
                answer: "オーナー自ら手取り足取りブリーチワークの指導をします。僕が10年打ち込んだ技術のノウハウをしっかり落とし込みます！現場でもブリーチ率80%を超えるのですぐに学んだことを実践することができます。"
              },
              {
                question: "採用までの流れはどんな感じですか？",
                answer: "まずはサロン見学に来てもらいます。遠方で難しい、まずは僕の雰囲気が知りたい方はzoomでも可能。その後希望があれば面接をして採用です！"
              },
              {
                question: "お客様の雰囲気は？",
                answer: "主に30代から40代がメインです。お客さんの特徴としては所得が高く比較的美容にお金を使う事が好きな方が多いです。"
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
          
          
        </div>
      </section>

      <section className="py-12 md:py-24 bg-gradient-to-r from-[#D3B58D]/10 to-[#D3B58D]/5">
        <SectionHeader 
          title="オーナー挨拶"
          subtitle="Message from Owner"
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3 flex flex-col items-center text-center">
                <div className="w-40 h-40 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white shadow-md mb-4">
                  <Image
                    src="/image/kuwayama.jpeg"
                    alt="オーナーの写真"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '50% 15%' }}
                    priority
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">オーナー</h3>
                <p className="text-gray-600 mb-6 md:mb-0">MASAKI</p>
              </div>
              
              <div className="md:w-2/3">
                <div className="prose prose-sm md:prose-lg max-w-none">
                  <p className="space-y-6 md:space-y-8">
                    <span className="block mb-6 text-gray-800 text-[15px] md:text-lg leading-relaxed tracking-wide px-2 md:px-0">
                      入社してまもない頃にブリーチデザインにハマりました。僕は今のお店をオープンするまで10年間人間としても美容師としても尊敬できるオーナーのもとで働いていました。
                      <br /><br />
                      ですがその時代は今ほど明るい髪色を好む方も少なく、学ぶ機会も実践する場もほとんどありませんでした。サロンはとてもいいお客さんが多く楽しい毎日でしたがブリーチをするお客さんはその当時、月に数えるほどでした。
                      <br /><br />
                      なのでたくさんのお金と時間を使い外部に講習に行く毎日でした。夜行バスに乗って東京に行くなんてよくある話でした。もちろん全てが身を結ぶことなんてなかっです。
                    </span>

                    <span className="block mb-6 text-gray-800 text-[15px] md:text-lg leading-relaxed tracking-wide px-2 md:px-0">
                      学んだことを実践してもそこから出てくる新しい疑問を解消するためにまた講習に出てのいたちごっこ。
                      <br /><br />
                      ハイトーンの集客なんてもちろん全部自分でやるしかなかったです笑
                      なんとかやりたい事を貫き大好きだったサロンに少しの恩は返せたかな？って頃に今のお店をオープンしました！
                    </span>

                    <span className="block mb-6 text-gray-800 text-[15px] md:text-lg leading-relaxed tracking-wide px-2 md:px-0">
                      ですが近年ではデビューまで2年、働き方の改革（業務委託、面貸し）、サロンの専門化などでこんな僕みたいな美容師人生を送るにはとてもよいオーナーの元にいるか、鬼のメンタルがいります笑
                      <br /><br />
                      僕の時代は根性論だったのでまわりもそんな感じでした笑
                      そんな経験から僕はこれからブリーチワークをする子たちに1秒でも早い成長、1円でも多く自分に使えるお金を与えたいなと思います。
                    </span>

                    <span className="block mb-6 text-gray-800 text-[15px] md:text-lg leading-relaxed tracking-wide px-2 md:px-0">
                      ブリーチにあまり触れないし、東京みたいなガチガチの都心サロンじゃなかったからこそ得る事ができたノウハウがありますし。また昔の僕と同じ環境で働いている子たちの悩みを解決してあげれると思います。
                      <br /><br />
                      この業界はまだまだ美容師の価値が低く、技術があるのに評価されない、適切な単価を頂けない美容師で溢れています。
                    </span>

                    <span className="block mb-6 text-gray-800 text-[15px] md:text-lg leading-relaxed tracking-wide px-2 md:px-0">
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p>◦ 仕事は好きだけど何の為に働いているのかわからない</p>
                        <p>◦ 自分には無理だった</p>
                        <p>◦ 東京行きたいけど諦めて名古屋にいる</p>
                      </div>
                    </span>

                    <span className="block text-gray-800 text-[15px] md:text-lg leading-relaxed tracking-wide px-2 md:px-0">
                      こうゆう方達を1人でも救いたいです。あなたの技術を好きになってくれて、一生評価してくれるお客様を1人でも多く付けてあげたい。
                      <br /><br />
                      努力が報われる瞬間、あなたしかいないと評価される瞬間はこの仕事をしていて1番美容師になって良かったと思える瞬間です。
                      <br /><br />
                      まずはやりたいと思う事が全ての始まりです、怖がらずにまずは僕に相談することから始めてみませんか！
                    </span>
                  </p>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#333] text-white py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-xl mb-4 flex items-center">
                <i className="fab fa-instagram text-2xl mr-2"></i>
                Instagram
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  
                  <a 
                    href="https://www.instagram.com/vrai.masaki?igsh=YWc4MzQwdWF1M2s4&utm_source=qr" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl hover:text-[#4a90e2]"
                  >
                    <i className="fab fa-instagram"></i>
                    <span className="text-sm ml-2">代表MASAKI</span>
                  </a>
                </div>
                
              </div>
            </div>
            <div>
              <h3 className="text-xl mb-4">店舗情報</h3>
              <p>住所：〒460-0021 愛知県名古屋市中区平和１-２２-５ パルティール金山アネックス１F</p>
              <p>電話：052-322-6363</p>
              <p>営業時間：火～金 10:00-21:00 / 土 10:00-20:30 / 日 10:00-20:00</p>
              <p>定休日：月曜日、不定休（火曜、日曜）</p>
              <div className="mt-4 w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.2177893964187!2d136.89901847677547!3d35.15783797275171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600376e7a4884f11%3A0x8d4f7558f2267c88!2z44CSNDYwLTAwMjEg5oSb55-l55yM5ZCN5Y-k5bGL5biC5Lit5Yy65bmz5ZKM77yR5LiB55uu77yS77yS4oiS77yVIOODkeODq-ODhuOCo-ODvOODq-mHkeWxseOCouODjeODg-OCr-OCuQ!5e0!3m2!1sja!2sjp!4v1711604575099!5m2!1sja!2sjp"
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

MainComponent.propTypes = {
  // 必要に応じてpropTypesを定義
};

export default function Home() {
  return <MainComponent />;
}

