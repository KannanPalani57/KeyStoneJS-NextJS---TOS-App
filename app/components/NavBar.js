import { Flex, Spacer, Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import styled from "styled-components";


    const Title = styled.h1`
        font-size: 1.6rem;
        padding-left: 4em;
    `;
    const Wrapper = styled.section`
        border-top: 12px solid #355e3b;
        .content{
            margin-top: 1.5em;
            height: 10vh;
            display: flex;
            flex-direction: row;
            align-items: center; 
        }
    `;
    const NavLinks = styled.section`
        display: flex;
        flex-direction: row;
        width: 60vw;
        justify-content: space-between;
        padding-left: 30%;
    `;
    const Tag = styled.a`
        font-size: 1.3rem;
        cursor: pointer;
        &: hover {
            color: green;
            border-bottom: 4px solid green;
        }
    `;

const NavBar = () => {
    return (
        <Wrapper>
            <div className="content">
                <Title>The Old School</Title>
                <NavLinks>
                    <Link href="/articles">
                        <Tag>Read Articles</Tag>
                    </Link>
                    <Link href="/about">
                        <Tag>About Us</Tag>
                    </Link>
                    <Link href="/contact">
                        <Tag>Contact</Tag>
                    </Link>
                </NavLinks>
            </div>
        </Wrapper>
    );
};

export default NavBar;
