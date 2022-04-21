import {allPosts, Post} from 'contentlayer/generated';
import {compareDesc, format, parseISO} from 'date-fns';
import {useMDXComponent} from 'next-contentlayer/hooks';
import Link from 'next/link';

function PostCard(post: Post) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className='mb-8'>
      <h2 className='text-xl'>
        <Link href={post.url}>
          <a className='text-blue-700 hover:text-blue-900'>{post.title}</a>
        </Link>
      </h2>
      <time dateTime={post.date} className='block text-xs text-gray-600 mb-2'>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <MDXContent />
    </div>
  );
}

export default function Home({posts}: {posts: Post[]}) {
  return (
    <div className='max-w-xl mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Next.js Example</h1>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return {props: {posts}};
}
