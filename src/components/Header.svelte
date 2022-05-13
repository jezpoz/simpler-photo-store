<header>
  <nav>
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/explore">Explore</a>
      </li>
      <li>
        <a href="/albums">Albums</a>
      </li>
      <li>
        <a href="/photographs">Photographs</a>
      </li>
      <li>
        <a href="/photographers">Photographers</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  nav {
    max-width: 2000px;
    margin: 0 auto;
    margin-bottom: 30px;
    padding: 0 12px;
  }

  nav > ul {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  nav > ul > li:first-of-type {
    padding: 12px 12px 12px 0px;
  }

  nav > ul > li:last-of-type {
    padding: 12px 0px 12px 12px;
  }

  nav > ul > li {
    padding: 12px;
  }

  @media(max-width: 600px) {
    nav {
      padding: 0px;
    }
  }

</style>