import {allPosts, Post} from 'contentlayer/generated';
import {format, parseISO} from 'date-fns';
import {GetStaticPropsContext} from 'next';
import {useMDXComponent} from 'next-contentlayer/hooks';
import Head from 'next/head';

const PostLayout = ({post}: {post: Post}) => {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className='max-w-xl mx-auto py-8'>
        <div className='text-center mb-8'>
          <time dateTime={post.date} className='text-xs text-gray-600 mb-1'>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <h1>{post.title}</h1>
        </div>
        <MDXContent />
      </article>
    </>
  );
};

export async function getStaticPaths() {
  const paths = allPosts.map(post => post.url);
  return {paths, fallback: false};
}

export async function getStaticProps({params}: GetStaticPropsContext) {
  const post = allPosts.find(post => post._raw.flattenedPath === params?.slug);
  return {props: {post}};
}

export default PostLayout;
