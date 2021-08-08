import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { keys } from "../lib/keys";

const ArticleCard = styled.div`
	display: flex;
	padding-left: 22vw;
	margin-top: 6vh;
	flex-direction: row;
	h2 {
		font-size: 1.6rem;
		font-weight: 500;
		margin: 0.6em 1.8em;
	}
	h2:hover {
		text-decoration: underline;
		cursor: pointer;
	}
`;

export default function RecentArticles({ article }) {
	return (
		<ArticleCard key={article.id}>
			<div>
				<Image
					src={`${keys.imageUrl}/${article?.coverImage?.filename}`}
					alt="article-image"
					width="300"
					height="150"
				></Image>
			</div>
			<div className="title-section">
				<h2>{article.title}</h2>
				<Link href={`article/${article.id}`}>
					<a href={`article/${article.id}`}>Read the Article</a>
				</Link>
			</div>
		</ArticleCard>
	);
}
