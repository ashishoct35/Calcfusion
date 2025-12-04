import { Helmet } from 'react-helmet-async';

const SchemaMarkup = ({ type, data }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": type,
        ...data
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default SchemaMarkup;
