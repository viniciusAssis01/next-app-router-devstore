import { api } from "@/data/api";
import { env } from "@/env";

import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

export const runtime = "edge";

export const alt = "About Acme";
export const size = {
	width: 1200,
	height: 630,
};
export const contentType = "image/png";

//fetch
async function getProduct(slug: string) {
	const response = await api(`/products/${slug}`, {
		cache: "force-cache",
		next: {
			revalidate: 60 * 60, //1h
		},
	});

	const product = await response.json();

	return product;
}

export default async function OgImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const product = await getProduct(slug);

	const productImageURL = new URL(product.image, env.APP_URL).toString();

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					background: colors.zinc[950],
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<img alt="" src={productImageURL} style={{ width: "100%" }} />
			</div>
		),
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			/* fonts: [//as fontes q vao ser usada no HTML acima
				{
					name: "Inter",
					data: await interSemiBold,
					style: "normal",
					weight: 400,
				},
			], */
		}
	);
}
