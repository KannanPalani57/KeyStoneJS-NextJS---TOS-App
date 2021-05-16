import { useRouter } from 'next/router';
import { gql } from "@apollo/client";
import client from "../../apolloClient";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Article({title, content}){
    return (
        <div>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content }}>
            </div>
        </div>
    )
}


export async function getStaticProps({ params }){
    const { data } = await client.query({
        query: gql`
            query getOnePost($id: ID!){
                Post(where: {id: $id}){
                title
                body
                }
            }
        `,
        variables: { id: params.articleId }        
    })
    const title = data.Post.title
    const content = await markdownToHtml(data.Post.body)
    return {
        props: {
            title,
            content
        }
    }
}

export async function getStaticPaths(){
    const { data } = await client.query({
        query: gql`
            query{
                allPosts{
                    id
                }
            }
        `,        
    })
    let paths;
    if(data){
        paths = data.allPosts.map(article => {
            return {
                params: { articleId: article.id }
            }
        })
    }

    return {
        paths,
        fallback: false
    }
}   