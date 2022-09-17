import Head from "next/head";
import React from "react";

export const PokeBuildHead = (props: { title: string }) => {
    const title = props.title + " - ぽけっとビルド"

    return <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico"/>
    </Head>;
}