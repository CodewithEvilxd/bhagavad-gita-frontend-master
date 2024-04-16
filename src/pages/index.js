import React from "react";
import HeroSection from "./../components/HeroSection";
import { useRouter } from "next/router";

function IndexPage(props) {
  const router = useRouter();

  return (
    <HeroSection
      color="white"
      size="medium"
      backgroundImage=""
      backgroundImageOpacity={1}
      title="Free Bhagavad Gita on your phone, tablet, and computer."
      subtitle="This landing page is perfect for showing off your awesome product and driving people to sign up for a paid plan."
      buttonText="Read the Bhagavad Gita"
      image="/static/bhagavadgita.png"
      buttonOnClick={() => {
        // Navigate to about page
        router.push("/");
      }}
    ></HeroSection>
  );
}

export default IndexPage;
