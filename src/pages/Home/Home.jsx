import React from "react";
import Banner from "./HomeComponents/Banner";
import Work from "./Work";
import OurServices from "./HomeComponents/OurServices";
import Company from "./HomeComponents/Company";
import Safe from "./HomeComponents/Safe";

const Home = () => {
  return (
    <div className="px-0.5">
      <section className="my-10">
        <Banner></Banner>
      </section>
      <section className="my-20">
        <Work></Work>
      </section>

      <section className="my-20">
        <OurServices></OurServices>
      </section>
      <section className="my-20">
        <Company></Company>
      </section>

      <section className="my-20">
        <Safe></Safe>
      </section>
    </div>
  );
};

export default Home;
