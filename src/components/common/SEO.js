import { Helmet } from "react-helmet";


function SEO(props) {
    const { children, ...customMeta } = props;
    const meta = {
        title: "Void Exchange | Perpetual Exchange on Base",
        description:
            "Void Exchange - Decentralized perpetual protocol on Base.",
        image: "https://docs.void.exchange/img/preview.jpg",
        type: "exchange",
        ...customMeta,
    };
    return (
        <>
            <Helmet>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="Void Exchange" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
            </Helmet>
            {children}
        </>
    );
}

export default SEO;
