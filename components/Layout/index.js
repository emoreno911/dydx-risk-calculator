import React from 'react';
import Head from 'next/head';

function Layout({ 
	children, 
	metadata = null,
	title = "DYDX Risk Calculator" 
}) {
	return (
		<div className="root">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<meta name="theme-color" content="#25122a" />
				<link rel="shortcut icon" href="/img/icon.png" />

				{metadata !== null && (
          <React.Fragment>
						<meta name="description" content={metadata.description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:image" content={metadata.image} />
            <meta property="og:url" content={metadata.url} />
            <meta property="og:site_name" content={metadata.sitename} />
            <meta name="twitter:title" content={metadata.title} />
            <meta name="twitter:description" content={metadata.description} />
            <meta name="twitter:image" content={metadata.image} />
          </React.Fragment>
        )}

				{/* <link href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" rel="stylesheet" /> */}

				<title>{title}</title>
			</Head>

			{ children }
		</div>
	)
}

export default Layout;