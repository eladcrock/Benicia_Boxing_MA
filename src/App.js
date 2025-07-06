import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Boxing from "./components/Boxing";
import Facility from "./components/Facility";
import Martial from "./components/Martial";
import NotFound from "./components/NotFound";
import Arnis from "./components/Arnis.js";
import Karate from "./components/Karate.js";
import "./App.css";

import PhoneIcon from "@mui/icons-material/Phone";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";

import BenBox from "./components/BenBox";
import ArnisSchedule from "./components/ArnisSchedule.js";
import Ring from "./components/Ring.js";
import BenKarate from "./components/BenKarate.js";
import BoxLightBox from "./components/BoxLightBox.js";
import Form from "./components/form.js";
import KenLightBox from "./components/KenLightBox.js";
import BenArnis from "./components/BenArnis.js";
import ArnisLightBox from "./components/ArnisLightBox.js";
import OfferK from "./components/OfferK.js";
import BoxSchedule from "./components/BoxSchedule.js";
import KenSchedule from "./components/KenSchedule.js";
import Follow from "./components/follow.js";
import Testimonial from "./components/Testimonial.js";
import SignUpModal from "./components/SignUpModal.js";
import ScrollToTop from "./components/ScrollToTop.js";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/plugins/captions.css";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYelp,
} from "@fortawesome/free-brands-svg-icons";

import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import AOS from "aos";
import "aos/dist/aos.css";

function useLazyBlob(url, shouldLoad = false) {
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    if (!shouldLoad) return;
    let alive = true;

    fetch(url)
      .then((r) => r.blob())
      .then((b) => {
        if (alive) setBlobUrl(URL.createObjectURL(b));
      });

    return () => {
      alive = false;
    };
  }, [url, shouldLoad]);

  return blobUrl ?? url;
}

function AppContent() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAbout = location.pathname === "/about";
  const isKarate = ["/karate", "/Karate"].includes(location.pathname);
  const isBoxing = location.pathname === "/boxing";
  const isArnis = ["/arnis", "/Arnis"].includes(location.pathname);

  const aboutHeaderBlob = useLazyBlob("/images/about.mp4", isAbout);
  const kenpoHeaderBlob = useLazyBlob("/images/kenpoHeader.mp4", isKarate);
  const boxingHeaderBlob = useLazyBlob("/images/boxingHeader.mp4", isBoxing);
  const arnisHeaderBlob = useLazyBlob("/images/arnisHeader.mov", isArnis);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    return () => AOS.refresh();
  }, []);

  return (
    <>
      <div>
        <header>
          <AppBar className="tool">
            <Toolbar className="tool">
              <Link to="/">
                <img
                  src="./images/logoTop.png"
                  alt="Logo"
                  className="logoTop"
                />
              </Link>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

              <IconButton
                className="hamburger"
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: "block", md: "none" } }}
                onClick={toggleMenu}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>

              <Drawer
                anchor="right"
                open={isMenuOpen}
                onClose={toggleMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <List>
                  {[
                    ["Home", "/"],
                    ["About", "/about"],
                    ["Boxing", "/boxing"],
                    ["Kenpo Karate", "/karate"],
                    ["Balintawak Arnis", "/arnis"],
                    ["Our Facility", "/facility"],
                    ["Contact", "/contact"],
                  ].map(([text, path]) => (
                    <ListItem
                      key={path}
                      button
                      component={Link}
                      to={path}
                      onClick={toggleMenu}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>

              <div className="desktop-menu">
                <nav className="navbar">
                  <ul className="nav-links">
                    {[
                      ["Home", "/"],
                      ["About", "/about"],
                      ["Boxing", "/boxing"],
                      ["Kenpo Karate", "/karate"],
                      ["Balintawak Arnis", "/arnis"],
                      ["Our Facility", "/facility"],
                      ["Contact", "/contact"],
                    ].map(([text, path]) => (
                      <li key={path}>
                        <Link
                          to={path}
                          className="nav-link"
                          style={{ color: "white" }}
                        >
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Toolbar>
          </AppBar>
        </header>

        <ScrollToTop />

        {["/", "/home"].includes(location.pathname) && (
          <div id="showcase" data-aos="fade-in"></div>
        )}

        {location.pathname === "/facility" && (
          <div id="facilityShowcase" data-aos="fade-in"></div>
        )}

        {isAbout && (
          <div id="aboutShowcase">
            <video autoPlay loop muted playsInline poster="/images/aboutPoster.jpg">
              <source src={aboutHeaderBlob} type="video/mp4" />
            </video>
          </div>
        )}

        {isKarate && (
          <div id="kenpoShowcase">
            <video autoPlay loop muted playsInline poster="/images/kenpoPoster.jpg">
              <source src={kenpoHeaderBlob} type="video/mp4" />
            </video>
          </div>
        )}

        {isBoxing && (
          <div id="boxShowcase">
            <video autoPlay loop muted playsInline poster="/images/boxingPoster.jpg">
              <source src={boxingHeaderBlob} type="video/mp4" />
            </video>
          </div>
        )}

        {isArnis && (
          <div id="arnisShowcase">
            <video autoPlay loop muted playsInline poster="/images/arnisPoster.jpg">
              <source src={arnisHeaderBlob} type="video/mp4" />
            </video>
          </div>
        )}

        {location.pathname === "/contact" && (
          <div id="contactShowcase" data-aos="fade-in"></div>
        )}
      </div>

      <main className="container">
        <TransitionGroup>
          <CSSTransition timeout={500} classNames="fade" key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/boxing" element={<Boxing />} />
              <Route path="/martial" element={<Martial />} />
              <Route path="/facility" element={<Facility />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/arnis" element={<Arnis />} />
              <Route path="/karate" element={<Karate />} />
              <Route path="/ArnisSchedule" element={<ArnisSchedule />} />
              <Route path="/BenBox" element={<BenBox />} />
              <Route path="/Ring" element={<Ring />} />
              <Route path="/BenKarate" element={<BenKarate />} />
              <Route path="/BoxLightBox" element={<BoxLightBox />} />
              <Route path="/Form" element={<Form />} />
              <Route path="/KenLightBox" element={<KenLightBox />} />
              <Route path="/BenArnis" element={<BenArnis />} />
              <Route path="/ArnisLightBox" element={<ArnisLightBox />} />
              <Route path="/OfferK" element={<OfferK />} />
              <Route path="/lightbox" element={<Lightbox />} />
              <Route path="/BoxSchedule" element={<BoxSchedule />} />
              <Route path="/KenSchedule" element={<KenSchedule />} />
              <Route path="/Follow" element={<Follow />} />
              <Route path="/Testimonial" element={<Testimonial />} />
              <Route path="/SignUpModal" element={<SignUpModal />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </main>

      <footer className="footer" data-aos="fade-in">
        <h4>Benicia Boxing & Martial Arts</h4>

        <div className="address-link">
          <a
            href="https://maps.google.com/?q=2002+Columbus+Pkwy+Benicia+CA+94510"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton size="small">
              <RoomIcon className="icon" />
            </IconButton>
            <span className="address">2002 Columbus Pkwy Benicia, CA 94510</span>
          </a>
        </div>

        <a href="tel:707-747-1722" className="foot-phone-link">
          <IconButton size="small">
            <PhoneIcon className="icon" />
          </IconButton>
          <span className="phone-number">707-747-1722</span>
        </a>

        <br />

        <a href="mailto:info@beniciabma.com" className="email-link">
          <IconButton size="small">
            <EmailIcon className="icon" />
          </IconButton>
          <span className="email-address">info@beniciabma.com</span>
        </a>

        <div className="social-media-icons">
          <a
            href="https://www.facebook.com/BeniciaBMA/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
          </a>
          <a
            href="https://www.instagram.com/beniciabma/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
          </a>
          <a
            href="https://www.yelp.com/biz/benicia-boxing-and-martial-arts-benicia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYelp} size="2x" className="icon" />
          </a>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
