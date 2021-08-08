import styled from "styled-components";
import Link from "next/link";

const LearnTogether = styled.section`
	height: 40vh;
	margin-top: 16vh;
	margin-bottom: 8vh;
	.learnText {
		font-weight: bold;
		text-align: center;
		font-size: 5rem;
	}
	.learn {
		color: #355e3b;
	}
	.channel-link {
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.channel-link h3 {
		font-size: 1.5rem;
		margin: 0.4em;
	}
	.link-address {
		font-size: 1.5rem;
		color: #355e3b;
		text-decoration: underline;
	}
`;

const MainContent = () => {
	return (
		<LearnTogether>
			<h1 className="learnText">
				#Let's <span className="learn"> Learn</span> Together
			</h1>
			<div className="channel-link">
				<h3 className="text-gray-500 font-bold">
					Visit Our Tamil Tech Youtube Channel!
				</h3>
				<Link href="#">
					<a className="link-address">The Old School.</a>
				</Link>
			</div>
		</LearnTogether>
	);
};

export default MainContent;
