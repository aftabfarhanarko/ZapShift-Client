import React from "react";
import Banner from "./HomeComponents/Banner";
import OurServices from "./HomeComponents/OurServices";
import Company from "./HomeComponents/Company";
import SecondBanner from "./HomeComponents/SecondBanner";
import Work from "./HomeComponents/Work";
import Stats from "./HomeComponents/Stats";
import Benefits from "./HomeComponents/Benefits";
import Features from "./HomeComponents/Features";
import AppDownload from "./HomeComponents/AppDownload";
import ParcelTypes from "./HomeComponents/ParcelTypes";
import QuickActions from "./HomeComponents/QuickActions";
import TrackSearch from "./HomeComponents/TrackSearch";

const Home = () => {
  return (
    <div className="px-0.5">
      <section className="mb-10">
        <Banner></Banner>
      </section>
      <section className="mt-20 md:max-w-11/12 mx-auto">
        <QuickActions></QuickActions>
      </section>

      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <TrackSearch></TrackSearch>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <Work></Work>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <OurServices></OurServices>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <Features></Features>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <Stats></Stats>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <Benefits></Benefits>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <SecondBanner></SecondBanner>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <ParcelTypes></ParcelTypes>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <AppDownload></AppDownload>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <Company></Company>
      </section>
    </div>
  );
};

export default Home;
