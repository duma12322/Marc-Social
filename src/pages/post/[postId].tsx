import type { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { unstable_getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import Layout from "@/components/common/layout";
import PostDetails from "@/components/post/post-details";

const PostPage = () => {
  const { query } = useRouter();

  const postId = query.postId as string;

  <Head>
    <title>Create T3 App</title>
    <meta name="description" content="Generated by create-t3-app" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;

  return (
    <Layout>
      <div className="p-5 bg-white rounded-lg dark:bg-slate-600">
        <PostDetails postId={postId} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default PostPage;
