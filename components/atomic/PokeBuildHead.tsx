import Head from "next/head";
import React from "react";

export const PokeBuildHead = (props: { title: string }) => {
    return <Head>
        <title>{props.title} - ぽけっとビルド</title>
        <link rel="icon" href="/favicon.ico"/>
    </Head>;
}