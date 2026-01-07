import React from "react";
import Banner from "./HomeComponents/Banner";
import OurServices from "./HomeComponents/OurServices";
import Company from "./HomeComponents/Company";
import Safe from "./HomeComponents/Safe";
import SecondBanner from "./HomeComponents/SecondBanner";
import Work from "./HomeComponents/Work";
import TextSections from "./HomeComponents/TextSections";
import MenuCard from "./HomeComponents/MenuCard";
import Stats from "./HomeComponents/Stats";
import Benefits from "./HomeComponents/Benefits";
import PricingPreview from "./HomeComponents/PricingPreview";
import CoverageTeaser from "./HomeComponents/CoverageTeaser";
import BigCTA from "./HomeComponents/BigCTA";
import Features from "./HomeComponents/Features";
import AppDownload from "./HomeComponents/AppDownload";
import MerchantFlow from "./HomeComponents/MerchantFlow";
import RiderBenefits from "./HomeComponents/RiderBenefits";
import ParcelTypes from "./HomeComponents/ParcelTypes";
import ServiceGuarantees from "./HomeComponents/ServiceGuarantees";
import SupportChannels from "./HomeComponents/SupportChannels";
import QuickActions from "./HomeComponents/QuickActions";
import TrackSearch from "./HomeComponents/TrackSearch";


const reivewPromis = fetch("/reviews.json").then(res => res.json());
const Home = () => {
  return (
    <div className="px-0.5">
      <section className="mb-10">
        <Banner></Banner>
      </section>
      <section className="mt-10 md:max-w-11/12 mx-auto">
        <QuickActions></QuickActions>
      </section>

      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <TrackSearch></TrackSearch>
      </section>
      <section className="my-10 mt-15 md:max-w-11/12 mx-auto">
        <Work></Work>
      </section>


      <section className="my-20">
        <OurServices></OurServices>
      </section>
      <section className="my-20">
        <Features></Features>
      </section>
      <section className="my-20">
        <MerchantFlow></MerchantFlow>
      </section>
      <section className="my-20">
        <Company></Company>
      </section>
      <section className="my-20">
        <Stats></Stats>
      </section>

      <section className="my-20">
        <Safe></Safe>
      </section>

      <section className="my-20">
        <Benefits></Benefits>
      </section>

      <section className="my-20">
       <SecondBanner></SecondBanner>
      </section>

      <section className="my-20">
        <PricingPreview></PricingPreview>
      </section>

      <section className="my-20">
        <ParcelTypes></ParcelTypes>
      </section>

      <section className="my-20">
       <MenuCard reivewPromis={reivewPromis}></MenuCard>
      </section>

      <section className="my-20">
        <CoverageTeaser></CoverageTeaser>
      </section>

      <section className="my-20">
        <ServiceGuarantees></ServiceGuarantees>
      </section>

      <section className="my-20">
       <TextSections></TextSections>
      </section>

      <section className="my-20">
        <SupportChannels></SupportChannels>
      </section>

      <section className="my-20">
        <BigCTA></BigCTA>
      </section>

      <section className="my-20">
        <AppDownload></AppDownload>
      </section>
    </div>
  );
};

export default Home;
