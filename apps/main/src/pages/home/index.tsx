import { BlankLayout, Box, i18n, Link, useAuth, useSettings } from '@mf-core/core-ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BaseLayout } from '../../layouts/base-layout';

export default function Home() {
  const { user } = useAuth();
  const { isReady, push } = useRouter();

  useEffect(() => {
    if (isReady) {
      // push(user && user.id ? "/sportbooking/dashboard" : "/auth/login");
    }
  }, [isReady, push, user]);

  const { settings } = useSettings();

  return (<BlankLayout>
    <Head>
      <title>{`${i18n.t(settings.name)} - ${i18n.t("home")}`}</title>
    </Head>
    <Box className="home">
      {/* Navigation */}
      <nav className="navbar">
        <Box className="logo">
          {/* Replace with the real logo URL if you have rights to use it */}
          <img src="/images/logo/logo-courtic.svg" alt="Courtic Sports" />
        </Box>
        <ul className="nav-links">
          <li><a>{i18n.t("home.menu.sports")}</a></li>
          <li><a>{i18n.t("home.menu.facilities")}</a></li>
          <li><a>{i18n.t("home.menu.events")}</a></li>
          <li><a href="/auth/login">{i18n.t("home.menu.login")}</a></li>
        </ul>
      </nav>

      {/* Hero section */}
      <header className="hero">
        {/* Replace the src with the correct video URL if you have rights to it */}
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/videos/home-sports-v1.mp4" type="video/mp4" />
          {/* Fallback image or content here */}
        </video>
        <div className="hero-overlay">
          <h1 className="hero-heading">رزرو آنلاین</h1>
          <h2 className="hero-subheading">زمین و باشگاه های ورزشی به همراه اساتید</h2>
          <p className="hero-text">
            شما می توانید به راحتی زمین ورزشی خود را رزرو کنید. همچنین میتوانید اساتید مورد نظر خود را انتخاب کنید.
            به آسانی در مسابقات ثبت نام کنید.
            در کارهای گروهی ورزشی شرکت کنید.
          </p>
          <div className="scroll-indicator">
            <span className="arrow-down">&#x2193;</span>
          </div>
        </div>
      </header>

      {/* Upcoming Events Section */}
      <section className="events">
        <h2>رویدادهای آتی</h2>
        <p>
          مسابقه بزرگ کیش: در این مسابقه همه ورزشکاران با یکدیگر مسابقه میدهند
        </p>
        <a href="/events" className="events-button">مشاهده همه</a>
      </section>

      {/* Promo / 2025 Edition Section */}
      <section className="promo">
        <h2>کورتیک</h2>
        <h3>2025</h3>
        <p>
          The 2025 edition of Courtic Sports is just around the corner.
          Secure your spot and get ready for a summer of non-stop action.
        </p>
        <button className="promo-video-btn">مشاهده ویدیو</button>
      </section>

      {/* Partners Section (placeholder logos) */}
      {/* <section className="partners">
        <h2>Our 2025 Partners</h2>
        <p>
          Courtic Sports is brought to you in collaboration with a host of sponsors and partners.
        </p>
        <div className="partner-logos">
          <a href="https://www.yonex.com/"><img src="https://via.placeholder.com/150x50?text=Partner+1" alt="Partner 1" /></a>
          <a href="https://bwfbadminton.com/"><img src="https://via.placeholder.com/150x50?text=Partner+2" alt="Partner 2" /></a>
          <a href="https://www.stigasports.com/en"><img src="https://via.placeholder.com/150x50?text=Partner+3" alt="Partner 3" /></a>
          <a href="https://www.dubaisc.ae/"><img src="https://via.placeholder.com/150x50?text=Partner+4" alt="Partner 4" /></a>
        </div>
      </section> */}

      {/* Mobile App Download Section */}
      <section className="app-download">
        <h2>دانلود</h2>
        <h3>اپلیکیشن موبایل</h3>
        <p>
          به راحتی رزرو کن و برنامه ریزی ورزشی خودت رو دنبال کن
        </p>
        <div className="store-links">
          <a href="https://apps.apple.com/app/courtic-sports-2025/id111111">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_logo_black.svg" alt="App Store" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.courticsports.signinapp">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-menu">
          <div>
            <h4>ورزش ها</h4>
            <ul>
              <li><a href="/sports/football">فوتبال</a></li>
              <li><a href="/sports/basketball">بسکتبال</a></li>
              <li><a href="/sports/volleyball">والیبال</a></li>
              <li><a href="/sports/tennis">تنیس</a></li>
              {/* ... */}
            </ul>
          </div>
          <div>
            <h4>مجموعه ها</h4>
            <ul>
              <li><a href="/academies/star-football-academy">آکادمی استار</a></li>
              <li><a href="/academies/ifa-sports-academy">آکادمی مریخ</a></li>
              {/* ... */}
            </ul>
          </div>
          <div>
            <h4>سرگرمی ها</h4>
            <ul>
              <li><a href="/active-fun">کورتیک بچه ها</a></li>
              <li><a href="/gym">جیم</a></li>
              <li><a href="/active-fun/#foosball-tables">فوتبال دستی</a></li>
              <li><a href="/active-fun/#retro-video-games">بازی های ویدیویی</a></li>
            </ul>
          </div>
          <div>
            <h4>درباره ما</h4>
            <ul>
              <li><a href="/about/venue-facilities">قوانین</a></li>
              <li><a href="/become-a-sponsor">ثبت به عنوان مجموعه</a></li>
              <li><a href="/about/faq">سوالات متداول</a></li>
              <li><a href="/about/contact">تماس با ما</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© ۱۴۰۴ کلیه حقوق متعلق به مجموعه کورتیک می باشد.</p>
          <ul className="legal-links">
            <li><a href="/terms-conditions">قوانین</a></li>
            <li><a href="/privacy-policy">حفظ حریم</a></li>
            <li><a href="/cookie-policy">قوانین کوکی ها</a></li>
          </ul>
          <ul className="social-links">
            <li><a href="https://www.instagram.com/courticsports/">Instagram</a></li>
            <li><a href="https://www.facebook.com/courticsports">Facebook</a></li>
            <li><a href="https://www.youtube.com/user/courticsports">YouTube</a></li>
            <li><a href="https://www.tiktok.com/@courticsports">TikTok</a></li>
          </ul>
        </div>
      </footer>
    </Box>
  </BlankLayout>
  );
}