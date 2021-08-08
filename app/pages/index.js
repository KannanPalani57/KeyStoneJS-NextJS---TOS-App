import client from "../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link"
import styled from "styled-components"
import MainContent from "../components/MainContent"
import RecentArticles from "../components/RecentArticles"
import Image from "next/image"
import { keys } from "../lib/keys"

const PublishedText = styled.h2`
    font-size: 1.4rem;
    margin: 0 14%;
    font-weight: bold;
    width: 22%;
    border-bottom: 4px solid #355e3b; 
`


export default function Index(props){
    return (
        <div>
        <MainContent />
           <PublishedText>Recently Published Articles</PublishedText>
           {
               props?.articles?.map(item => {
                   return <RecentArticles article={item}/>
               })
           }
        </div>
    )
}

export async function getStaticProps() {
    const { data } = await client.query({
        query: gql`
            query{
                allPosts{
                    id
                    title
                    body
                    coverImage{
                        filename
                    }
                }
            }
        `,    
    })

    return {
        props: {
            articles: data.allPosts
        }
    }
}