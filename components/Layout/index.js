import React from 'react';
import Head from 'next/head';

const NEXT_PUBLIC_GOOGLE_ANALYTICS = "UA-42792810-1"

function Layout({ 
	children, 
	metadata = null,
	title = "DYDX Risk Calculator" 
}) {
	return (
		<div className="root">
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<meta name="theme-color" content="#171722" />
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

				{/* Global Site Tag (gtag.js) - Google Analytics */}
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
						if (window.location.hostname !== 'localhost')
						{
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
								page_path: window.location.pathname,
							});
						}
						`,
					}}
				/>

				<title>{title}</title>
			</Head>

			{ children }
		</div>
	)
}

export default Layout;