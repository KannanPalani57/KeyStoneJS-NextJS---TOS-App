import client from "../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link"


export default function Index(props){
    return (
        <div>
           <h2>Articles We have right now :)</h2>
           {
               props.articles.map(item => {
                   return (
                            <div key={item.id}>
                                <h3>{item.title}</h3>
                                <Link href={`article/${item.id}`}>  
                                    <a href={`article/${item.id}`}>Read the Article</a>
                                </Link>    
                            </div>
                        )
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