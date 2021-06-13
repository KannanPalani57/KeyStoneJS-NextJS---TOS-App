import client from "../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link"
// import Image from "next/image"

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
           {/* <Image src="/introToGit.jpg" alt="me" width="200" height="200"></Image> */}
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