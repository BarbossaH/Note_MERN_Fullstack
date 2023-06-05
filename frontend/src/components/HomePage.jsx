import { Link } from 'react-router-dom';

const HomePage = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Julian' CV</span>
        </h1>
      </header>
      <main className="public_main">
        <p>I am Julian and this is my statement.</p>
        <address className="public_addr">
          5 Hendon Ave <br />
          MT Albert <br />
          Auckland <br />
          <a href="tel:022 177 3909">022 177 3909</a>
        </address>
        <br />
      </main>
      <footer>
        <Link to={'/login'}>Employee Login</Link>
      </footer>
    </section>
  );
  return <div>{content}</div>;
};
export default HomePage;
