import React from "react";
import About from '@components/index/about';
import OurService from '@components/index/ourService';
import ContactUs from '@components/index/contactUs';
import WhyMusense from "./whyMusense";

export default function Page() {
    return <>
        <About />
        <OurService />
        <WhyMusense />
        <ContactUs />
    </>;
}
