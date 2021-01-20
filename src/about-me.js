/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { jsx, Image, Flex, Styled } from "theme-ui";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoPlaystation,
  IoLogoStackoverflow,
} from "react-icons/io5";
import { FaSpotify } from "react-icons/fa";

import avatar from "./avatar.jpeg";
import Link from "./link";

const SocialLink = ({ icon, url }) => (
  <Styled.li sx={{ display: "inline-block", m: 0 }}>
    <Link
      sx={{
        mr: [3, 3, 4],
        fontSize: 5,
      }}
      href={url}
    >
      {icon}
    </Link>
  </Styled.li>
);

const Paragraph = ({ sx, ...props }) => (
  <Styled.p {...props} sx={{ ...sx, variant: "text.condensed" }} />
);

const DescriptionFull = () => (
  <>
    <Paragraph>
      I like functional programming, code puzzles, cloud stuff and high-tech
      products.
    </Paragraph>
    <Paragraph>
      Over the years I have done both back-end and front-end development, using
      different languages, runtimes and frameworks. Top contenders are (in no
      particular order): C#/.NET, Java, Kotlin, F#/.NET, Javascript, Typescript,
      React, Spring Framework, Apache Flink, Kubernetes, Google Cloud Platform,
      Serverless Functions and Gatsby.js.
    </Paragraph>
    <Paragraph>
      I have a Bachelor's degree in Computer Science and I have professional
      experience in different projects ranging from enterprise software,
      e-commerce platforms, service applications and machine software at
      companies like Philips Hue, Bol.com, Imperial Brands, The Sting and ASML.
    </Paragraph>
    <Paragraph>
      In my free time I like to ride my motorcycle, listen to all sorts of
      music, snowboard and play couch co-op / board games. I write about stuff
      that might interest me, or things that I have encountered in my work or
      hobby projects.
    </Paragraph>
  </>
);

const DescriptionShort = () => (
  <>
    <Paragraph>
      I like functional programming, code puzzles, cloud stuff and high-tech
      products. In my free time I like to ride my motorcycle, listen to all
      sorts of music, snowboard and play couch co-op / board games.
    </Paragraph>
    <Paragraph>
      I occasionally write about stuff that I encounter in my professional life.
      Also, I may ramble about stuff I find interesting. Lately I've been into
      learning new functional programming languages like F# and Scala. Who
      knows.
    </Paragraph>
  </>
);

export default ({ short }) => {
  const data = useStaticQuery(graphql`
    query AboutMeQuery {
      site {
        siteMetadata {
          social {
            github
            linkedin
            stackoverflow
            spotify
            playstation
          }
        }
      }
    }
  `);

  const social = data.site.siteMetadata.social;

  return (
    <Flex
      sx={{
        flexDirection: ["column", "column", "row"],
        alignItems: ["center", "center", "flex-start"],
      }}
    >
      <Image
        src={avatar}
        variant={short ? "avatarSmall" : "avatar"}
        sx={{
          mt: [0, 0, 3],
        }}
      />
      <Flex
        sx={{
          ml: [0, 0, 4],
          mt: [2, 2, 0],
          flexDirection: "column",
          flex: "1",
        }}
      >
        <Styled.h2 sx={{ variant: "text.condensed" }}>About me</Styled.h2>
        {short ? <DescriptionShort /> : <DescriptionFull />}
        <Styled.ul
          sx={{
            listStyle: "none",
            p: 0,
            mt: [2, 2, 3],
            alignSelf: ["center", "center", "flex-start"],
          }}
        >
          <SocialLink icon={<IoLogoGithub />} url={social.github} />
          <SocialLink icon={<IoLogoLinkedin />} url={social.linkedin} />
          <SocialLink
            icon={<IoLogoStackoverflow />}
            url={social.stackoverflow}
          />
          <SocialLink icon={<FaSpotify />} url={social.spotify} />
          <SocialLink icon={<IoLogoPlaystation />} url={social.playstation} />
        </Styled.ul>
      </Flex>
    </Flex>
  );
};
