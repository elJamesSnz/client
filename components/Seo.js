import React from "react";
import Head from "next/head";

export default function Seo(props) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <met property="description" content={description} />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Gaming - Tus juegos favoritos",
  description: "Tus juegos para Steam, PS4, Xbox y Switch. Al mejor precio.",
};
